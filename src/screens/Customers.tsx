import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from '../../components/ui/button';
import { Input, InputField } from '../../components/ui/input';
import { colors } from '../theme';

type Customer = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  createdAt: number;
};

// simple validators
const isEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);
const isPhone = (s: string) => /^[0-9()+\-.\s]{7,}$/.test(s);
const countDigits = (s: string) => (s.match(/\d/g) || []).length;

const uid = () =>
  (globalThis as any).crypto?.randomUUID?.() ??
  `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;

export default function Customers() {
  // form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  // errors per field
  const [nameErr, setNameErr] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  // search / list state
  const [queryRaw, setQueryRaw] = useState('');
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Customer[]>([]);
  // edit mode
  const [editId, setEditId] = useState<string | null>(null);

  // tiny debounce for search
  React.useEffect(() => {
    const t = setTimeout(() => setQuery(queryRaw.trim().toLowerCase()), 200);
    return () => clearTimeout(t);
  }, [queryRaw]);

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setNameErr('');
    setPhoneErr('');
    setEmailErr('');
    setEditId(null);
  };

  const validate = () => {
    let ok = true;
    setNameErr('');
    setPhoneErr('');
    setEmailErr('');

    if (!name.trim()) {
      setNameErr('Name is required.');
      ok = false;
    }
    if (email.trim() && !isEmail(email.trim())) {
      setEmailErr('Email looks invalid.');
      ok = false;
    }
    if (phone.trim()) {
      if (!isPhone(phone.trim())) {
        setPhoneErr('Phone looks invalid.');
        ok = false;
      } else if (countDigits(phone.trim()) < 10) {
        setPhoneErr('Phone must have at least 10 digits.');
        ok = false;
      }
    }
    return ok;
  };

  const onSave = () => {
    if (!validate()) return;

    const n = name.trim();
    // simple duplicate check by name (case-insensitive) when creating new
    const exists = !editId && items.some(c => c.name.toLowerCase() === n.toLowerCase());
    if (exists) {
      setNameErr('A customer with that name already exists.');
      return;
    }

    if (editId) {
      setItems(prev =>
        prev.map(c =>
          c.id === editId ? { ...c, name: n, phone: phone.trim(), email: email.trim() } : c
        )
      );
    } else {
      setItems(prev => [
        { id: uid(), name: n, phone: phone.trim(), email: email.trim(), createdAt: Date.now() },
        ...prev,
      ]);
    }
    resetForm();
  };

  const onEdit = (c: Customer) => {
    setEditId(c.id);
    setName(c.name);
    setPhone(c.phone ?? '');
    setEmail(c.email ?? '');
    setNameErr('');
    setPhoneErr('');
    setEmailErr('');
  };

  const onDelete = (id: string) => {
    Alert.alert('Delete customer', 'Are you sure you want to delete this customer?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setItems(prev => prev.filter(c => c.id !== id)),
      },
    ]);
  };

  const filtered = useMemo(() => {
    if (!query) return items;
    return items.filter(c => {
      const hay = `${c.name} ${c.phone ?? ''} ${c.email ?? ''}`.toLowerCase();
      return hay.includes(query);
    });
  }, [items, query]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customers</Text>
        <Text style={styles.headerSubtitle}>Manage your shop&apos;s customers</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Input>
          <InputField
            placeholder="Search by name, phone, or email"
            value={queryRaw}
            onChangeText={setQueryRaw}
            autoCapitalize="none"
            style={styles.inputFieldSearch}
            placeholderTextColor={colors.textMuted}
          />
        </Input>
      </View>

      {/* Form Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{editId ? 'Edit Customer' : 'Add Customer'}</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Name *</Text>
          <Input>
            <InputField
              placeholder="John Doe"
              value={name}
              onChangeText={(t) => {
                setName(t);
                if (nameErr) setNameErr('');
              }}
              autoCapitalize="words"
              style={[styles.inputField, !!nameErr && styles.inputFieldError]}
              placeholderTextColor={colors.textMuted}
            />
          </Input>
          {!!nameErr && <Text style={styles.errorText}>{nameErr}</Text>}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone</Text>
          <Input>
            <InputField
              placeholder="(555) 555-5555"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(t) => {
                setPhone(t);
                if (phoneErr) setPhoneErr('');
              }}
              style={[styles.inputField, !!phoneErr && styles.inputFieldError]}
              placeholderTextColor={colors.textMuted}
            />
          </Input>
          {!!phoneErr && <Text style={styles.errorText}>{phoneErr}</Text>}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Input>
            <InputField
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (emailErr) setEmailErr('');
              }}
              style={[styles.inputField, !!emailErr && styles.inputFieldError]}
              placeholderTextColor={colors.textMuted}
            />
          </Input>
          {!!emailErr && <Text style={styles.errorText}>{emailErr}</Text>}
        </View>

        <View style={styles.actionsRow}>
          <Button onPress={onSave} style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>{editId ? 'Update' : 'Save Customer'}</Text>
          </Button>
          {editId ? (
            <Button action="secondary" onPress={resetForm} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>Cancel</Text>
            </Button>
          ) : null}
        </View>
      </View>

      {/* List */}
      <View style={styles.listWrap}>
        {filtered.map((c) => (
          <View key={c.id} style={styles.listCard}>
            <View style={styles.listTopRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.customerName}>{c.name}</Text>
                {!!c.phone && <Text style={styles.customerMeta}>📞 {c.phone}</Text>}
                {!!c.email && <Text style={styles.customerMeta}>✉️ {c.email}</Text>}
                <Text style={styles.customerAdded}>
                  Added {new Date(c.createdAt).toLocaleString()}
                </Text>
              </View>

              <View style={styles.listActionsCol}>
                <Button size="sm" onPress={() => onEdit(c)} style={styles.smallPrimaryBtn}>
                  <Text style={styles.smallBtnText}>Edit</Text>
                </Button>
                <Button size="sm" action="negative" onPress={() => onDelete(c.id)} style={styles.smallDangerBtn}>
                  <Text style={styles.smallBtnText}>Delete</Text>
                </Button>
              </View>
            </View>

            <TouchableOpacity onPress={() => onEdit(c)}>
              <Text style={styles.quickEdit}>Quick edit</Text>
            </TouchableOpacity>
          </View>
        ))}

        {filtered.length === 0 && (
          <Text style={styles.emptyText}>No customers yet. Add one above.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: colors.background,
    minHeight: '100%',
    flexGrow: 1,
  },

  header: {
    padding: 24,
    paddingBottom: 8,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: colors.textSecondary,
    marginTop: 2,
    fontSize: 15,
  },

  searchWrap: {
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 12,
  },
  inputFieldSearch: {
    color: colors.textPrimary,
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  card: {
    backgroundColor: colors.surface,
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },

  field: {
    gap: 6,
    marginBottom: 8,
  },
  label: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  inputField: {
    color: colors.textPrimary,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputFieldError: {
    borderColor: colors.textDanger,
  },
  errorText: {
    color: colors.textDanger,
    fontWeight: '500',
  },

  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 18,
  },
  primaryBtnText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  secondaryBtn: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryBtnText: {
    color: colors.textSecondary,
    fontWeight: 'bold',
  },

  listWrap: {
    gap: 16,
    marginHorizontal: 24,
    marginBottom: 32,
  },
  listCard: {
    borderRadius: 16,
    padding: 18,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: 2,
  },
  listTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  listActionsCol: {
    alignItems: 'flex-end',
    gap: 8,
  },

  customerName: {
    fontWeight: '700',
    fontSize: 17,
    color: colors.textPrimary,
  },
  customerMeta: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  customerAdded: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 6,
  },

  smallPrimaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  smallDangerBtn: {
    backgroundColor: colors.danger,
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  smallBtnText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
  },

  quickEdit: {
    color: colors.link,
    marginTop: 10,
    fontWeight: '600',
  },

  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 24,
  },
});
