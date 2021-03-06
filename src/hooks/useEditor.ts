import { createContext, useContext } from 'react';

export const EditorContext = createContext<{
  componentMappings?: {
    [key: string]: React.ComponentType<any>;
  };
  content?: any;
  isEditor?: boolean;
  templateAnnotations?: { [template: string]: string };
  templateDefinitions?: { [template: string]: any };
}>({});

export const useEditor = () => useContext(EditorContext);
