/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { DateRangeType } from "./components/datePickerParts/single-date-picker/single-date-picker";
import { ShortcutType } from "./components/date-range-picker/date-range-picker";
import { Option } from "./components/select-2/select-2";
import { DateRangeType as DateRangeType1, IdDatePickerState, NullableDate } from "./components/datePickerParts/single-date-picker/single-date-picker";
export { DateRangeType } from "./components/datePickerParts/single-date-picker/single-date-picker";
export { ShortcutType } from "./components/date-range-picker/date-range-picker";
export { Option } from "./components/select-2/select-2";
export { DateRangeType as DateRangeType1, IdDatePickerState, NullableDate } from "./components/datePickerParts/single-date-picker/single-date-picker";
export namespace Components {
    interface DatePicker {
        "defaultStyle": string;
        /**
          * YYYY-MM-DD
         */
        "defaultValue": string | Date;
        "displayFormat": (d: Date) => string;
        "maxDate": Date;
        "minDate": Date;
        "target": string;
    }
    interface DateRangePicker {
        "defaultStyle": string;
        "defaultValue": undefined | DateRangeType;
        "displayFormat": (d: Date) => string;
        "maxDate": Date;
        "minDate": Date;
        "placeholder": string;
        "rangeValueChanged": undefined | ((v: string) => string);
        "separator": string;
        "shortcutList": boolean | ShortcutType[];
        "target": string;
        "useConfirmation": boolean;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface Select2 {
        "defaultValue": Option | Option[];
        "isClearable": boolean;
        "isMulti": boolean;
        "isSearchable": boolean;
        "options": Option[];
    }
    interface SingleDatePicker {
        "currentMonth": number;
        "currentYear": number;
        "maxDate": Date;
        "minDate": Date;
        "picker_id": IdDatePickerState;
        "selected": NullableDate | DateRangeType1;
        "setCurrentMonth": (month: number, year: number, idComp: IdDatePickerState) => void;
        "setCurrentYear": (year: number, month: number, idComp: IdDatePickerState) => void;
        "setMouseEnterDate": (v: Date) => void;
        "setSelected": (v: Date) => void;
    }
}
declare global {
    interface HTMLDatePickerElement extends Components.DatePicker, HTMLStencilElement {
    }
    var HTMLDatePickerElement: {
        prototype: HTMLDatePickerElement;
        new (): HTMLDatePickerElement;
    };
    interface HTMLDateRangePickerElement extends Components.DateRangePicker, HTMLStencilElement {
    }
    var HTMLDateRangePickerElement: {
        prototype: HTMLDateRangePickerElement;
        new (): HTMLDateRangePickerElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLSelect2Element extends Components.Select2, HTMLStencilElement {
    }
    var HTMLSelect2Element: {
        prototype: HTMLSelect2Element;
        new (): HTMLSelect2Element;
    };
    interface HTMLSingleDatePickerElement extends Components.SingleDatePicker, HTMLStencilElement {
    }
    var HTMLSingleDatePickerElement: {
        prototype: HTMLSingleDatePickerElement;
        new (): HTMLSingleDatePickerElement;
    };
    interface HTMLElementTagNameMap {
        "date-picker": HTMLDatePickerElement;
        "date-range-picker": HTMLDateRangePickerElement;
        "my-component": HTMLMyComponentElement;
        "select-2": HTMLSelect2Element;
        "single-date-picker": HTMLSingleDatePickerElement;
    }
}
declare namespace LocalJSX {
    interface DatePicker {
        "defaultStyle"?: string;
        /**
          * YYYY-MM-DD
         */
        "defaultValue"?: string | Date;
        "displayFormat"?: (d: Date) => string;
        "maxDate"?: Date;
        "minDate"?: Date;
        "target"?: string;
    }
    interface DateRangePicker {
        "defaultStyle"?: string;
        "defaultValue"?: undefined | DateRangeType;
        "displayFormat"?: (d: Date) => string;
        "maxDate"?: Date;
        "minDate"?: Date;
        "placeholder"?: string;
        "rangeValueChanged"?: undefined | ((v: string) => string);
        "separator"?: string;
        "shortcutList"?: boolean | ShortcutType[];
        "target"?: string;
        "useConfirmation"?: boolean;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface Select2 {
        "defaultValue"?: Option | Option[];
        "isClearable"?: boolean;
        "isMulti"?: boolean;
        "isSearchable"?: boolean;
        "options"?: Option[];
    }
    interface SingleDatePicker {
        "currentMonth": number;
        "currentYear": number;
        "maxDate"?: Date;
        "minDate"?: Date;
        "picker_id": IdDatePickerState;
        "selected": NullableDate | DateRangeType1;
        "setCurrentMonth": (month: number, year: number, idComp: IdDatePickerState) => void;
        "setCurrentYear": (year: number, month: number, idComp: IdDatePickerState) => void;
        "setMouseEnterDate"?: (v: Date) => void;
        "setSelected": (v: Date) => void;
    }
    interface IntrinsicElements {
        "date-picker": DatePicker;
        "date-range-picker": DateRangePicker;
        "my-component": MyComponent;
        "select-2": Select2;
        "single-date-picker": SingleDatePicker;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "date-picker": LocalJSX.DatePicker & JSXBase.HTMLAttributes<HTMLDatePickerElement>;
            "date-range-picker": LocalJSX.DateRangePicker & JSXBase.HTMLAttributes<HTMLDateRangePickerElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "select-2": LocalJSX.Select2 & JSXBase.HTMLAttributes<HTMLSelect2Element>;
            "single-date-picker": LocalJSX.SingleDatePicker & JSXBase.HTMLAttributes<HTMLSingleDatePickerElement>;
        }
    }
}
