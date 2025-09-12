import { Platform } from 'react-native';

// native
import { DollarSign as NativeDollar, Users as NativeUsers } from 'lucide-react-native';
// web
import { DollarSign as WebDollar, Users as WebUsers } from 'lucide-react';

export const DollarSign = (props: any) =>
  Platform.OS === 'web' ? <WebDollar {...props} /> : <NativeDollar {...props} />;

export const Users = (props: any) =>
  Platform.OS === 'web' ? <WebUsers {...props} /> : <NativeUsers {...props} />;
