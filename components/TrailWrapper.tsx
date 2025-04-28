import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useRef,
} from "react";

export default function TrailWrapper() {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { children }: PropsWithChildren<{}> = {};

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={["25%", "50%", "100%"]}
      detached={false}
    >
      <BottomSheetView className="items-center bg-white w-full h-full">
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
}
