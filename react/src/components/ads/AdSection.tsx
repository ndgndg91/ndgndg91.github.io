import React from 'react';
import { useIsMounted } from '../../hooks/useIsMounted';

interface AdSectionProps {
  type?: 'banner' | 'sidebar' | 'content';
  showAds?: boolean;
}

/**
 * AdSection is a placeholder for advertising content.
 * Following the decision to remove Kakao AdFit for hydration stability,
 * this component currently returns null to prevent layout shifts and mismatches.
 */
const AdSection: React.FC<AdSectionProps> = () => {
  const isMounted = useIsMounted();

  // Return nothing even after mounting to keep the site ad-free 
  // while satisfying compilation requirements in legacy components.
  if (!isMounted) return null;
  
  return null;
};

export default AdSection;
