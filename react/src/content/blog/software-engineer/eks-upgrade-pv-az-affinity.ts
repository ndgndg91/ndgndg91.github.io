import type { BlogPost } from '../../../types/blog';

export const eksUpgradePvAzAffinity: BlogPost = {
  id: 'eks-upgrade-pv-az-affinity',
  title: 'The EBS PV Availability Zone Trap During EKS Upgrades',
  description: 'How a legacy gp2 Persistent Volume locked our stateful services to a single AZ, leading to infinite scheduling pending loops during a Kubernetes cluster upgrade.',
  category: 'software-engineer',
  date: '2026-05-11',
  updatedDate: '2026-05-11',
  tags: ['Kubernetes', 'EKS Upgrade', 'AWS', 'EBS', 'Persistent Volumes', 'SRE', 'Incident Report'],
  image: 'eks-upgrade-pv-az-affinity.webp',
  content: `
    <nav class="mb-4" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <li><a href="/" class="hover:text-gray-700 dark:hover:text-gray-300">Home</a></li>
        <li class="flex items-center">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <a href="/blog/software-engineer/list" class="ml-2 hover:text-gray-700 dark:hover:text-gray-300">Software Engineer</a>
        </li>
        <li class="flex items-center">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">EBS PV AZ Trap</span>
        </li>
      </ol>
    </nav>
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">The EBS PV Availability Zone Trap During EKS Upgrades</h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        During a major Kubernetes cluster upgrade, we expected standard node rollover challenges. What we did not expect was a five-hour outage triggered by a six-year-old AWS EBS volume AZ configuration. Here is how legacy stateful service volumes can silently lock your cluster scheduling during routine upgrades.
      </p>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">1. The Incident: Infinite Pending State</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          During an EKS cluster upgrade from 1.32 to 1.34, we initiated a rolling update of our node groups. Our core stateful service, a Zookeeper cluster backing our transactional matching engine, was terminated to allow the pods to be rescheduled on the new 1.34 nodes.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The nodes rolled, but the Zookeeper pods never recovered. They remained in the <code>Pending</code> state indefinitely. Inspecting the pod events showed:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
0/141 nodes are available:
131 node(s) didn\'t match Pod\'s node affinity/selector
8 node(s) didn\'t match PersistentVolume\'s node affinity
2 node(s) had untolerated taint(s)
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The critical clue was: <strong>"node(s) didn\'t match PersistentVolume\'s node affinity"</strong>. Our stateful containers could not be scheduled because the available nodes were incompatible with the volumes containing their persistent data.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">2. The Root Cause: gp2 PV Availability Zone Binding</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          To understand why this happened, we inspected the age of the Zookeeper Persistent Volumes:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
NAME              CLAIM               STORAGECLASS   AGE
data-zookeeper-0  pvc-14c17617-...    gp2            6y75d
data-zookeeper-1  pvc-329dd18d-...    gp2            6y75d
data-zookeeper-2  pvc-56613520-...    gp2            6y75d
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          These volumes were AWS EBS <code>gp2</code> volumes created over six years ago. When an EBS volume is created in AWS, it is physically tied to a single Availability Zone (e.g., <code>ap-northeast-2a</code>). Because of this physical constraint, Kubernetes automatically attaches a <code>nodeAffinity</code> rule to the PV, restricting scheduling to that specific AZ:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-yellow-300">kubectl get pv {pv-name} -o yaml | grep -A 5 nodeAffinity</span>
# topology.kubernetes.io/zone: ap-northeast-2a
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          During the EKS upgrade, our Terraform configuration provisioned new worker nodes for the target node group. However, due to ASG (Auto Scaling Group) balancing, the new nodes were spun up in <code>ap-northeast-2b</code> and <code>ap-northeast-2c</code>.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          This created an impossible scheduling constraint:
        </p>
        <ol class="list-decimal pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>The pod\'s <code>nodeSelector</code> required the node to belong to the designated <code>matching-engine</code> node group.</li>
          <li>The PV\'s <code>nodeAffinity</code> required the node to reside in <code>ap-northeast-2a</code>.</li>
          <li>No new nodes in the <code>matching-engine</code> node group existed in <code>ap-northeast-2a</code>.</li>
        </ol>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          As a result, the scheduler was completely blocked, and the pods remained Pending.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">3. The Blast Radius: Cascading Failures</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Because Zookeeper was down, our core matching engine could not boot. And because the matching engine was down, dependent API gateways, transaction processors, and web applications failed their readiness probes. Over 20 backend microservices went offline, causing rolling updates to freeze and extending what should have been a 30-minute node rotation into a 5-hour outage.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">4. Best Practices for Stateful EKS Upgrades</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          To prevent this scheduling deadlock in future upgrades, we established a strict pre-flight audit checklist:
        </p>
        
        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-6">A. Audit PV Availability Zones</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Before starting a cluster upgrade, identify all volumes that have been in service for a long period and check their AZ bindings:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
kubectl get pv -A -o custom-columns=\'NAME:.metadata.name,CLAIM:.spec.claimRef.name,SC:.spec.storageClassName\'
</pre>
        </div>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-6">B. Pin Auto Scaling Groups to the Correct Subnets</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          For node groups hosting stateful workloads, ensure that the Terraform definition forces node creation in the subnets matching the PV AZs:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">module</span> <span class="text-green-400">"stateful_node_group"</span> {
  source             = <span class="text-green-400">"terraform-aws-modules/eks/aws//modules/self-managed-node-group"</span>
  subnet_ids         = [<span class="text-yellow-300">data.aws_subnet.ap_northeast_2a.id</span>] # Pin to the correct AZ
}
</pre>
        </div>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-6">C. Transition to Multi-AZ-aware Storage (gp3 or EFS)</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Whenever possible, migrate legacy <code>gp2</code> volumes to <code>gp3</code> or use storage backends that support dynamic scheduling across multiple zones. If you must use single-AZ EBS volumes, ensure that your StatefulSet replicas are distributed across different AZs with corresponding PVs.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">5. Conclusion</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          In a cloud-native architecture, we often treat compute resources as ephemeral and easily replaceable. However, stateful storage introduces gravity. Legacy EBS volumes carry physical constraints that bypass standard Kubernetes orchestration. Documenting these dependencies and auditing volume AZ constraints before major infrastructure maintenance is essential to keeping your EKS upgrades seamless.
        </p>
      </section>
    </article>
  `
};
