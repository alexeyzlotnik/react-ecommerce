"use client";

import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { SearchInput } from "./SearchInput";
import { StrapiProductService } from "../../../services/StrapiProductService";

const _numberToLoad: number = 8;
const service = new StrapiProductService(_numberToLoad);

interface SearchModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
}

export const SearchModal = ({ open, title, onClose }: SearchModalProps) => {
  return (
    <Dialog.Root lazyMount open={open} onOpenChange={() => onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <SearchInput
                searchProducts={service.searchProducts.bind(service)}
              />
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
