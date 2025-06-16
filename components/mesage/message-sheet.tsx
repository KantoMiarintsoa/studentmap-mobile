// components/chat/MessageOptionsSheet.tsx
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text } from 'react-native';

type MessageOptionsSheetProps = {
  onReply: () => void;
  onDelete: () => void;
  onClose?:()=>void;
};

const MessageOptionsSheet = forwardRef<BottomSheet, MessageOptionsSheetProps>(
  ({ onReply, onDelete, onClose }, ref) => {
    const snapPoints = useMemo(() => ['25%'], []);

    const {t} = useTranslation();

    return (
        <BottomSheet ref={ref} index={-1} snapPoints={snapPoints} enablePanDownToClose
            onChange={(event)=>{if(event===-1){
                onClose?.();
            }}}
        >
            <BottomSheetView style={{ padding: 20 }}>
                <Pressable onPress={onReply} style={{ paddingVertical: 10 }}>
                    <Text>{t("message.reply")}</Text>
                </Pressable>
            </BottomSheetView>
        </BottomSheet>
    );
  }
);

export default MessageOptionsSheet;
