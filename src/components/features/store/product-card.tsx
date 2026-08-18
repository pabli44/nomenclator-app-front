import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import type { ComponentProps } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

import { ParchmentCard } from '@/src/components/ui';
import { VINTAGE_COLORS } from '@/src/constants/vintage';
import { type Product } from '@/src/data/products';
import { type Personalization, type PurchaseVariant } from '@/src/state/cart-context';
import { ThemedText } from '../../shared';
import { storeStyles } from './store.styles';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface ModalOption {
  variant: PurchaseVariant;
  icon: IconName;
  title: string;
  description: string;
}

const MODALITIES: ModalOption[] = [
  {
    variant: 'digital',
    icon: 'download-outline',
    title: 'Digital (descarga)',
    description: 'Recibí la postal digital en alta resolución.',
  },
  {
    variant: 'personalizada',
    icon: 'create-outline',
    title: 'Personalizada',
    description: 'Agregá un nombre y una dedicatoria a tu postal.',
  },
  {
    variant: 'impresion',
    icon: 'mail-outline',
    title: 'Impresión (envío)',
    description: 'Recibí en casa una postal impresa.',
  },
];

const VARIANT_LABELS: Record<PurchaseVariant, string> = {
  digital: 'Digital (descarga)',
  personalizada: 'Personalizada',
  impresion: 'Impresión (envío)',
};

function formatPrice(value: number) {
  return `$${value.toLocaleString('es-CO')}`;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (
    product: Product,
    variant: PurchaseVariant,
    personalization?: Personalization,
  ) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<PurchaseVariant | null>(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [validationError, setValidationError] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const resetModalState = () => {
    setSelectedVariant(null);
    setName('');
    setMessage('');
    setValidationError(false);
  };

  const openModal = () => {
    resetModalState();
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    resetModalState();
  };

  const handleSelectVariant = (variant: PurchaseVariant) => {
    setSelectedVariant(variant);
    setValidationError(false);
  };

  const handleAddToCart = () => {
    if (selectedVariant === null) {
      return;
    }

    let personalization: Personalization | undefined;
    if (selectedVariant === 'personalizada') {
      const trimmedName = name.trim();
      const trimmedMessage = message.trim();
      if (!trimmedName || !trimmedMessage) {
        setValidationError(true);
        return;
      }
      personalization = { name: trimmedName, message: trimmedMessage };
    }

    onAddToCart(product, selectedVariant, personalization);
    closeModal();
    setAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 1200);

    if (Platform.OS === 'ios') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const renderVariantStep = () => (
    <>
      {MODALITIES.map((option) => (
        <Pressable
          key={option.variant}
          style={({ pressed }) => [
            storeStyles.modalOption,
            selectedVariant === option.variant && storeStyles.modalOptionActive,
            pressed && storeStyles.modalOptionPressed,
          ]}
          onPress={() => handleSelectVariant(option.variant)}
          accessibilityRole="button"
          accessibilityLabel={`Elegir ${option.title}`}
        >
          <Ionicons name={option.icon} size={22} color={VINTAGE_COLORS.brown} />
          <View style={storeStyles.modalOptionBody}>
            <ThemedText style={storeStyles.modalOptionTitle}>{option.title}</ThemedText>
            <ThemedText style={storeStyles.modalOptionDescription}>
              {option.description}
            </ThemedText>
          </View>
          <ThemedText style={storeStyles.modalOptionPrice}>{formatPrice(product.price)}</ThemedText>
        </Pressable>
      ))}
    </>
  );

  const renderConfirmStep = () => {
    if (selectedVariant === null) {
      return null;
    }

    return (
      <>
        <Pressable
          style={({ pressed }) => [storeStyles.modalBackButton, pressed && { opacity: 0.7 }]}
          onPress={() => setSelectedVariant(null)}
          accessibilityRole="button"
          accessibilityLabel="Volver a elegir modalidad"
        >
          <ThemedText style={storeStyles.modalBackButtonText}>‹ Cambiar modalidad</ThemedText>
        </Pressable>

        <ThemedText style={storeStyles.modalOptionTitle}>
          {VARIANT_LABELS[selectedVariant]}
        </ThemedText>
        <ThemedText style={storeStyles.modalOptionDescription}>
          {MODALITIES.find((option) => option.variant === selectedVariant)?.description}
        </ThemedText>
        <ThemedText style={storeStyles.modalConfirmPrice}>{formatPrice(product.price)}</ThemedText>

        {selectedVariant === 'personalizada' && (
          <>
            <ThemedText style={storeStyles.modalInputLabel}>Nombre</ThemedText>
            <TextInput
              style={storeStyles.modalInput}
              value={name}
              onChangeText={setName}
              placeholder="Ej: Mariana"
              placeholderTextColor={VINTAGE_COLORS.placeholderText}
              accessibilityLabel="Nombre para la postal"
            />
            <ThemedText style={storeStyles.modalInputLabel}>Dedicatoria</ThemedText>
            <TextInput
              style={storeStyles.modalInput}
              value={message}
              onChangeText={setMessage}
              placeholder="Escribí tu dedicatoria"
              placeholderTextColor={VINTAGE_COLORS.placeholderText}
              multiline
              accessibilityLabel="Dedicatoria para la postal"
            />
            {validationError && (
              <ThemedText style={storeStyles.modalErrorText}>
                Completá nombre y dedicatoria
              </ThemedText>
            )}
          </>
        )}

        <Pressable
          style={({ pressed }) => [
            storeStyles.cardButton,
            storeStyles.modalConfirmButton,
            { opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={handleAddToCart}
          accessibilityRole="button"
          accessibilityLabel="Agregar al carrito"
        >
          <ThemedText style={storeStyles.cardButtonText}>Agregar al carrito</ThemedText>
        </Pressable>
      </>
    );
  };

  return (
    <View style={storeStyles.card}>
      {product.image ? (
        <Image source={product.image} style={storeStyles.cardImage} resizeMode="cover" />
      ) : (
        <View style={storeStyles.cardImagePlaceholder}>
          <Ionicons name="image" size={36} color={VINTAGE_COLORS.placeholderText} />
        </View>
      )}
      <View style={storeStyles.cardBody}>
        <View>
          <ThemedText style={storeStyles.cardCategory}>{product.category}</ThemedText>
          <ThemedText style={storeStyles.cardName} numberOfLines={2}>
            {product.name}
          </ThemedText>
        </View>
        <View>
          <ThemedText style={storeStyles.cardPrice}>{formatPrice(product.price)}</ThemedText>
          <Pressable
            style={({ pressed }) => [
              storeStyles.cardButton,
              { opacity: pressed ? 0.85 : 1 },
            ]}
            onPress={openModal}
            accessibilityRole="button"
            accessibilityLabel={`Comprar ${product.name}`}
          >
            <ThemedText style={storeStyles.cardButtonText}>
              {added ? '✓ Agregado' : 'Comprar'}
            </ThemedText>
          </Pressable>
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={closeModal}>
        <View style={storeStyles.modalOverlay}>
          <ParchmentCard style={storeStyles.modalCard}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={storeStyles.modalHeader}>
                <ThemedText style={storeStyles.modalTitle}>¿Como quieres recibirla?</ThemedText>
                <Pressable
                  style={({ pressed }) => [
                    storeStyles.modalCloseButton,
                    pressed && storeStyles.modalCloseButtonPressed,
                  ]}
                  onPress={closeModal}
                  hitSlop={4}
                  accessibilityRole="button"
                  accessibilityLabel="Cerrar"
                >
                  <Ionicons name="close" size={22} color={VINTAGE_COLORS.textMuted} />
                </Pressable>
              </View>
              <ThemedText style={storeStyles.modalSubtitle}>
                {product.name} · {formatPrice(product.price)}
              </ThemedText>

              {selectedVariant === null ? renderVariantStep() : renderConfirmStep()}
            </ScrollView>
          </ParchmentCard>
        </View>
      </Modal>
    </View>
  );
}