declare module 'lucide-react-native' {
  import * as React from 'react';
  import { SvgProps } from 'react-native-svg';
  export interface IconProps extends SvgProps { color?: string; size?: number | string; }
  export const DollarSign: React.FC<IconProps>;
  export const Receipt: React.FC<IconProps>;
  export const Users: React.FC<IconProps>;
  export const Wrench: React.FC<IconProps>;
}
