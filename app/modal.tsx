import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ParchmentCard,
  ParchmentView,
  VintageBackHeader,
  VintageButton,
} from '@/src/components/ui';
import { type CartItem, type PurchaseVariant, useCart } from '@/src/state/cart-context';
import { VINTAGE_COLORS, VINTAGE_FONTS, VINTAGE_RADIUS } from '@/src/constants/vintage';

const VARIANT_BADGE_LABELS: Record<PurchaseVariant, string> = {
  digital: 'Digital · Descarga',
  personalizada: 'Personalizada · Nombre',
  impresion: 'Impresión · Envío',
};

function formatPrice(value: number) {
  return `$${value.toLocaleString('es-CO')}`;
}

export default function ModalScreen() {
  const router = useRouter();
  const { items, total, incrementItem, decrementItem, removeItem, clearCart } = useCart();

  const handleIncrement = (item: CartItem) => {
    incrementItem(item.id);
    if (Platform.OS === 'ios') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleDecrement = (item: CartItem) => {
    decrementItem(item.id);
    if (Platform.OS === 'ios') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleRemove = (item: CartItem) => {
    removeItem(item.id);
    if (Platform.OS === 'ios') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleConfirm = () => {
    clearCart();
    Alert.alert(
      'Compra confirmada',
      '¡Gracias por tu compra! Te contactaremos para coordinar el despacho.',
      [{ text: 'Listo', onPress: () => router.back() }],
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: VINTAGE_COLORS.parchment }}
      edges={['top', 'left', 'right']}
    >
      <ParchmentView>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <VintageBackHeader
            title="Tu carrito"
            trailing={<Ionicons name="cart" size={26} color={VINTAGE_COLORS.brown} />}
          />
          <Text style={styles.subtitle}>• HISTORIA EN CAMINO •</Text>

          {items.length === 0 ? (
            <ParchmentCard style={styles.emptyCard}>
              <Ionicons name="bag-outline" size={40} color={VINTAGE_COLORS.cardBorderDark} />
              <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
              <Text style={styles.emptyText}>
                Explorá la tienda y llevate un pedazo de Cartagena a casa.
              </Text>
              <VintageButton
                onPress={() => router.back()}
                color={VINTAGE_COLORS.brown}
                style={styles.primaryButton}
              >
                Volver a la tienda
              </VintageButton>
            </ParchmentCard>
          ) : (
            <>
              <View style={styles.itemsList}>
                {items.map((item) => (
                  <ParchmentCard key={item.id} style={styles.itemCard}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemName} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <Text style={styles.itemTotal}>
                        {formatPrice(item.price * item.quantity)}
                      </Text>
                    </View>
                    <View style={styles.variantBadge}>
                      <Text style={styles.variantBadgeText}>
                        {VARIANT_BADGE_LABELS[item.variant]}
                      </Text>
                    </View>
                    {item.variant === 'personalizada' && item.personalization && (
                      <View style={styles.personalizationBlock}>
                        <Text style={styles.personalizationText} numberOfLines={2}>
                          Para: {item.personalization.name}
                        </Text>
                        <Text style={styles.personalizationText} numberOfLines={3}>
                          Dedicatoria: {item.personalization.message}
                        </Text>
                      </View>
                    )}
                    <View style={styles.itemActions}>
                      <View style={styles.stepper}>
                        <Pressable
                          style={({ pressed }) => [
                            styles.stepperButton,
                            pressed && styles.stepperButtonPressed,
                          ]}
                          onPress={() => handleDecrement(item)}
                          accessibilityRole="button"
                          accessibilityLabel={`Quitar una unidad de ${item.name}`}
                        >
                          <Ionicons name="remove" size={18} color={VINTAGE_COLORS.textMuted} />
                        </Pressable>
                        <View style={styles.stepperQuantity}>
                          <Text style={styles.stepperQuantityText}>{item.quantity}</Text>
                        </View>
                        <Pressable
                          style={({ pressed }) => [
                            styles.stepperButton,
                            pressed && styles.stepperButtonPressed,
                          ]}
                          onPress={() => handleIncrement(item)}
                          accessibilityRole="button"
                          accessibilityLabel={`Agregar una unidad de ${item.name}`}
                        >
                          <Ionicons name="add" size={18} color={VINTAGE_COLORS.textMuted} />
                        </Pressable>
                      </View>
                      <Pressable
                        style={({ pressed }) => [
                          styles.itemRemoveButton,
                          pressed && styles.itemRemoveButtonPressed,
                        ]}
                        onPress={() => handleRemove(item)}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel={`Quitar ${item.name} del carrito`}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={20}
                          color={VINTAGE_COLORS.textMuted}
                        />
                      </Pressable>
                    </View>
                  </ParchmentCard>
                ))}
              </View>

              <ParchmentCard style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Total</Text>
                  <Text style={styles.summaryValue}>{formatPrice(total)}</Text>
                </View>
              </ParchmentCard>

              <VintageButton
                onPress={handleConfirm}
                color={VINTAGE_COLORS.brown}
                style={styles.primaryButton}
              >
                <Ionicons name="checkmark-circle" size={18} color={VINTAGE_COLORS.white} />
                Confirmar compra
              </VintageButton>
              <VintageButton
                onPress={() => router.back()}
                color={VINTAGE_COLORS.textSecondary}
                variant="outline"
                style={styles.secondaryButton}
              >
                Seguir comprando
              </VintageButton>
            </>
          )}
        </ScrollView>
      </ParchmentView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 10,
    letterSpacing: 3,
    color: VINTAGE_COLORS.textMuted,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 20,
    fontFamily: VINTAGE_FONTS.serif,
  },

  itemsList: {
    width: '100%',
    gap: 10,
  },
  itemCard: {
    width: '100%',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  variantBadge: {
    alignSelf: 'flex-start',
    backgroundColor: VINTAGE_COLORS.parchmentLight,
    borderWidth: 1,
    borderColor: VINTAGE_COLORS.cardBorder,
    borderRadius: VINTAGE_RADIUS.badge,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 8,
  },
  variantBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: VINTAGE_COLORS.textMuted,
  },
  personalizationBlock: {
    marginTop: 8,
    gap: 2,
  },
  personalizationText: {
    fontSize: 12,
    color: VINTAGE_COLORS.textDescription,
    lineHeight: 16,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: VINTAGE_COLORS.cardBorder,
    borderRadius: VINTAGE_RADIUS.pill,
    backgroundColor: VINTAGE_COLORS.parchmentLight,
  },
  stepperButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: VINTAGE_RADIUS.pill,
  },
  stepperButtonPressed: {
    opacity: 0.6,
    backgroundColor: 'rgba(61, 40, 23, 0.08)',
  },
  stepperQuantity: {
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperQuantityText: {
    fontSize: 15,
    fontWeight: '800',
    color: VINTAGE_COLORS.textPrimary,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: VINTAGE_COLORS.textPrimary,
  },
  itemTotal: {
    fontSize: 15,
    fontWeight: '800',
    color: VINTAGE_COLORS.textSecondary,
  },
  itemRemoveButton: {
    minHeight: 44,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: VINTAGE_RADIUS.pill,
  },
  itemRemoveButtonPressed: {
    opacity: 0.6,
    backgroundColor: 'rgba(61, 40, 23, 0.08)',
  },

  summaryCard: {
    width: '100%',
    marginTop: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: VINTAGE_COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '800',
    color: VINTAGE_COLORS.brown,
  },

  primaryButton: {
    width: '100%',
    marginTop: 20,
    minHeight: 48,
  },
  secondaryButton: {
    width: '100%',
    marginTop: 10,
    minHeight: 48,
  },

  emptyCard: {
    alignItems: 'center',
    gap: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: VINTAGE_COLORS.textPrimary,
    fontFamily: VINTAGE_FONTS.serif,
  },
  emptyText: {
    fontSize: 13,
    color: VINTAGE_COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
  },
});