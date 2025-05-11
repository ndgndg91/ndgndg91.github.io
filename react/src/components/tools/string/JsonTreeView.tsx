import React, { useState, useCallback } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject { [key: string]: JsonValue; }
type JsonArray = JsonValue[];

interface JsonNodeProps {
  name: string;
  value: JsonValue;
  level?: number;
  isParentArray?: boolean;
}

interface JsonNodeProps {
  name: string;
  value: JsonValue;
  level?: number;
  isParentArray?: boolean;
  isDarkMode?: boolean;
}

const JsonNode: React.FC<JsonNodeProps> = ({ name, value, level = 0, isParentArray = false, isDarkMode = false }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first two levels
  const hasChildren = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);
  const isEmpty = hasChildren && Object.keys(value).length === 0;
  const indent = level * 16;

  const toggleExpand = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(prev => !prev);
  }, []);

  const renderValue = (val: JsonValue): React.ReactNode => {
    if (val === null) return <span className="text-purple-500">null</span>;
    if (typeof val === 'boolean') return <span className="text-blue-500">{String(val)}</span>;
    if (typeof val === 'number') return <span className="text-green-600">{val}</span>;
    if (typeof val === 'string') return <span className="text-red-500">"{val}"</span>;
    return null;
  };

  const renderBrackets = (type: '{}' | '[]') => (
    <span className="text-gray-500">
      {type[0]}
      {!isExpanded && !isEmpty && <span className="opacity-50">...</span>}
      {type[1]}
    </span>
  );

  if (!hasChildren) {
    return (
      <div className="flex items-baseline" style={{ marginLeft: `${indent}px` }}>
        {!isParentArray && (
          <>
            <span className="text-purple-700">"{name}"</span>
            <span className="text-gray-500 mr-1">: </span>
          </>
        )}
        {renderValue(value)}
        <span className="text-gray-500">,</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div 
        className="flex items-baseline cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        onClick={toggleExpand}
        style={{ marginLeft: `${indent}px` }}
      >
        {hasChildren && (
          <span className="inline-flex items-center justify-center w-4 h-4 mr-1">
            {isExpanded ? 
              <ChevronDown size={16} className={isDarkMode ? 'text-white' : 'text-gray-800'} /> : 
              <ChevronRight size={16} className={isDarkMode ? 'text-white' : 'text-gray-800'} />
            }
          </span>
        )}
        {!isParentArray && (
          <>
            <span className="text-purple-700">"{name}"</span>
            <span className="text-gray-500 mr-1">: </span>
          </>
        )}
        {isArray ? renderBrackets('[]') : renderBrackets('{}')}
      </div>
      
      {isExpanded && (
        <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
          {isArray ? (
            (value as JsonArray).map((item, index) => (
              <JsonNode
                key={index}
                name={String(index)}
                value={item}
                level={level + 1}
                isParentArray={true}
                isDarkMode={isDarkMode}
              />
            ))
          ) : (
            Object.entries(value as JsonObject).map(([key, val]) => (
              <JsonNode
                key={key}
                name={key}
                value={val}
                level={level + 1}
                isDarkMode={isDarkMode}
              />
            ))
          )}
          <div style={{ marginLeft: `${indent + 16}px` }}>
            {isArray ? ']' : '}'}
            <span className="text-gray-500">,</span>
          </div>
        </div>
      )}
    </div>
  );
};

interface JsonTreeViewProps {
  data: JsonValue;
  isDarkMode?: boolean;
}

export const JsonTreeView: React.FC<JsonTreeViewProps> = ({ data, isDarkMode = false }) => {
  return (
    <div className="font-mono text-sm p-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-auto">
      <JsonNode name="" value={data} isParentArray={false} isDarkMode={isDarkMode} />
    </div>
  );
};

export default JsonTreeView;
