/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppHome {
    }
    interface AppRoot {
    }
    interface AudioPicker {
        "getSelectedAudioUrl": () => Promise<string>;
        "lingueeResults": LingueeResult[];
    }
    interface ImagePicker {
        "getSelectedImageUrls": () => Promise<string[]>;
        "urls": string[];
    }
    interface LanguageSelect {
        "getValue": () => Promise<string>;
    }
    interface SelectableCheckmark {
        "selected": boolean;
    }
}
declare global {
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLAudioPickerElement extends Components.AudioPicker, HTMLStencilElement {
    }
    var HTMLAudioPickerElement: {
        prototype: HTMLAudioPickerElement;
        new (): HTMLAudioPickerElement;
    };
    interface HTMLImagePickerElement extends Components.ImagePicker, HTMLStencilElement {
    }
    var HTMLImagePickerElement: {
        prototype: HTMLImagePickerElement;
        new (): HTMLImagePickerElement;
    };
    interface HTMLLanguageSelectElement extends Components.LanguageSelect, HTMLStencilElement {
    }
    var HTMLLanguageSelectElement: {
        prototype: HTMLLanguageSelectElement;
        new (): HTMLLanguageSelectElement;
    };
    interface HTMLSelectableCheckmarkElement extends Components.SelectableCheckmark, HTMLStencilElement {
    }
    var HTMLSelectableCheckmarkElement: {
        prototype: HTMLSelectableCheckmarkElement;
        new (): HTMLSelectableCheckmarkElement;
    };
    interface HTMLElementTagNameMap {
        "app-home": HTMLAppHomeElement;
        "app-root": HTMLAppRootElement;
        "audio-picker": HTMLAudioPickerElement;
        "image-picker": HTMLImagePickerElement;
        "language-select": HTMLLanguageSelectElement;
        "selectable-checkmark": HTMLSelectableCheckmarkElement;
    }
}
declare namespace LocalJSX {
    interface AppHome {
    }
    interface AppRoot {
    }
    interface AudioPicker {
        "lingueeResults"?: LingueeResult[];
    }
    interface ImagePicker {
        "urls"?: string[];
    }
    interface LanguageSelect {
    }
    interface SelectableCheckmark {
        "selected"?: boolean;
    }
    interface IntrinsicElements {
        "app-home": AppHome;
        "app-root": AppRoot;
        "audio-picker": AudioPicker;
        "image-picker": ImagePicker;
        "language-select": LanguageSelect;
        "selectable-checkmark": SelectableCheckmark;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "audio-picker": LocalJSX.AudioPicker & JSXBase.HTMLAttributes<HTMLAudioPickerElement>;
            "image-picker": LocalJSX.ImagePicker & JSXBase.HTMLAttributes<HTMLImagePickerElement>;
            "language-select": LocalJSX.LanguageSelect & JSXBase.HTMLAttributes<HTMLLanguageSelectElement>;
            "selectable-checkmark": LocalJSX.SelectableCheckmark & JSXBase.HTMLAttributes<HTMLSelectableCheckmarkElement>;
        }
    }
}
