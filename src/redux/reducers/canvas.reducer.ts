import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Canvas, CanvasState, sortCanvasComponents } from "types/Canvas";
import { CanvasComponent } from "types/Canvas/Canvas.components";

const initialState: CanvasState = {
  canvases: [],
};

const CanvasReducer = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    addNewCanvas: (state, action: PayloadAction<Canvas>) => {
      return { ...state, canvases: [...state.canvases, action.payload] };
    },
    removeCanvas: (state, action: PayloadAction<{ id: string }>) => {
      return { ...state, canvases: state.canvases.filter((canvas) => canvas.id !== action.payload.id) };
    },
    addComponent: (state, action: PayloadAction<{ canvasId: string; component: CanvasComponent }>) => {
      const updatedCanvases = state.canvases.map((canvas) =>
        canvas.id === action.payload.canvasId
          ? {
              ...canvas,
              components: [...canvas.components, { ...action.payload.component }].sort(sortCanvasComponents),
            }
          : canvas
      );
      return { ...state, canvases: updatedCanvases };
    },
    removeComponent: (state, action: PayloadAction<{ canvasId: string; componentId: string }>) => {
      const updatedCanvases = state.canvases.map((canvas) =>
        canvas.id === action.payload.canvasId
          ? {
              ...canvas,
              components: canvas.components
                .filter((component) => component.id !== action.payload.componentId)
                .sort(sortCanvasComponents),
            }
          : canvas
      );
      return { ...state, canvases: updatedCanvases };
    },
    moveComponent: (state, action: PayloadAction<{ canvasId: string; dragIndex: number; hoverIndex: number }>) => {
      const currentCanvas = state.canvases.find((c) => c.id === action.payload.canvasId);

      if (!currentCanvas) return;
      const dragItem = currentCanvas.components[action.payload.dragIndex];

      if (dragItem) {
        const copiedStateArray = [...currentCanvas.components];
        const prevItem = copiedStateArray.splice(action.payload.hoverIndex, 1, dragItem);

        copiedStateArray.splice(action.payload.dragIndex, 1, prevItem[0]);
        const updatedCanvases = state.canvases.map((canvas) =>
          canvas.id === action.payload.canvasId ? { ...canvas, components: copiedStateArray } : canvas
        );

        return { ...state, canvases: updatedCanvases };
      }
    },
    changeComponentData: (
      state,
      action: PayloadAction<{
        canvasId: string;
        componentId: string;
        newComponentData: CanvasComponent;
      }>
    ) => {
      const updatedCanvas = state.canvases.map((canvas) =>
        canvas.id === action.payload.canvasId
          ? {
              ...canvas,
              components: canvas.components.map((component) =>
                component.id === action.payload.componentId ? action.payload.newComponentData : component
              ),
            }
          : canvas
      );
      return { ...state, canvases: updatedCanvas };
    },
  },
});

export const canvasActions = CanvasReducer.actions;
export default CanvasReducer.reducer;
