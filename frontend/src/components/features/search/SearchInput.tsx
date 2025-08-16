"use client";

import {
  Combobox,
  HStack,
  Portal,
  Span,
  Spinner,
  useListCollection,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAsync } from "react-use";
import { useDebounce } from "react-use";
import { Product, ProductsListResponse } from "@/lib/definitions";
import { useNavigate } from "react-router";

interface SearchInputProps {
  searchProducts: (params: {
    name: string;
  }) => Promise<ProductsListResponse | undefined>;
  onTriggerClose: () => void;
}

export const SearchInput = ({
  searchProducts,
  onTriggerClose,
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const navigate = useNavigate();

  // Debounce the input value with 300ms delay
  useDebounce(
    () => {
      setDebouncedValue(inputValue);
    },
    300,
    [inputValue]
  );

  const openSelectedProduct = (productId: string): void => {
    if (!productId) return;
    navigate(`product/${productId}`);
    onTriggerClose();
  };

  const { collection, set } = useListCollection<Product>({
    initialItems: [],
    itemToString: item => item.name,
    itemToValue: item => item.documentId.toString(),
  });

  const state = useAsync(async () => {
    if (!debouncedValue.trim()) {
      set([]);
      return;
    }

    const response = await searchProducts({ name: debouncedValue });
    const data = await response;
    if (data) {
      set(data.data);
    }
  }, [debouncedValue, searchProducts]);

  return (
    <Combobox.Root
      collection={collection}
      placeholder="placeholder"
      onInputValueChange={e => setInputValue(e.inputValue)}
      positioning={{ sameWidth: true, placement: "bottom-start" }}
      onSelect={e => openSelectedProduct(e.itemValue)}>
      <Combobox.Label>Search Products</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner className="!z-[1402]">
          <Combobox.Content minW="sm">
            {state.loading ? (
              <HStack p="2">
                <Spinner size="xs" borderWidth="1px" />
                <Span>Loading...</Span>
              </HStack>
            ) : state.error ? (
              <Span p="2" color="fg.error">
                Error fetching
              </Span>
            ) : (
              collection.items?.map(product => (
                <Combobox.Item key={product.documentId} item={product}>
                  <HStack justify="space-between" textStyle="sm">
                    <Span fontWeight="medium" truncate>
                      {product.name}
                    </Span>
                    <Span color="fg.muted" truncate>
                      {product.price}$
                    </Span>
                  </HStack>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
};
