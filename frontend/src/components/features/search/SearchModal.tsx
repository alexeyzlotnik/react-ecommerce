"use client";

import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { SearchInput } from "./SearchInput";
import { StrapiProductService } from "../../../services/StrapiProductService";

const _numberToLoad: number = 8;
const service = new StrapiProductService(_numberToLoad);

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export const SearchModal = ({ open, onClose }: SearchModalProps) => {
  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={() => onClose()}
      size={"lg"}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body className="!py-8">
              <SearchInput
                searchProducts={service.searchProducts.bind(service)}
                onTriggerClose={() => onClose()}
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
