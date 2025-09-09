import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button } from '../../components/ui/button';
import { Input, InputField } from '../../components/ui/input';

type Customer = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
};

const uid = () =>
  (globalThis as any).crypto?.randomUUID?.() ??
  `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;

export default function Customers() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [items, setItems] = useState<Customer[]>([]);

  const addCustomer = () => {
    const n = name.trim();
    if (!n) return;
    setItems(prev => [{ id: uid(), name: n, phone: phone.trim(), email: email.trim() }, ...prev]);
    setName(''); setPhone(''); setEmail('');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add Customer</Text>

        <View style={{ gap: 6 }}>
          <Text>Full name</Text>
          <Input>
            <InputField
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </Input>
        </View>

        <View style={{ gap: 6 }}>
          <Text>Phone</Text>
          <Input>
            <InputField
              placeholder="(555) 555-5555"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </Input>
        </View>

        <View style={{ gap: 6 }}>
          <Text>Email</Text>
          <Input>
            <InputField
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </Input>
        </View>

        <Button onPress={addCustomer}>Save Customer</Button>
      </View>

      <View style={{ height: 1, backgroundColor: '#ccc', opacity: 0.7 }} />

      <View style={{ gap: 12 }}>
        {items.map(c => (
          <View
            key={c.id}
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              padding: 12,
              backgroundColor: '#fff',
            }}
          >
            <Text style={{ fontWeight: '600', marginBottom: 4 }}>{c.name}</Text>
            {c.phone ? <Text>📞 {c.phone}</Text> : null}
            {c.email ? <Text>✉️ {c.email}</Text> : null}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
