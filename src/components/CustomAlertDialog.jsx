import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/react";
import React from "react";

function CustomAlertDialog({
  title,
  children,
  showCancelBtn,
  showConfirmBtn,
  cancelText,
  confirmText,
  isOpen,
  onClose,
  confirmColor,
  cancelColor,
  onConfirm
}) {
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{children}</AlertDialogBody>
          <AlertDialogFooter>
            {showCancelBtn && (
              <Button
                ref={cancelRef}
                colorScheme={cancelColor || "red"}
                onClick={onClose}>
                {cancelText}
              </Button>
            )}
            {showConfirmBtn && (
              <Button
                onClick={onConfirm}
                colorScheme={confirmColor || "teal"}
                ml={3}>
                {confirmText}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default CustomAlertDialog;
