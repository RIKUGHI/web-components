[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

# Web Components

[![npm version](https://img.shields.io/npm/v/@rikughi/web-components?style=flat-square)](https://www.npmjs.com/package/@rikughi/web-components)
[![npm version](https://img.shields.io/npm/dt/@rikughi/web-components?style=flat-square)](https://www.npmjs.com/package/@rikughi/web-components)

## Contents

- [Installation](#installation)
- [DatePicker](src/components/date-picker/readme.md)
- [DateRangePicker](src/components/date-range-picker/readme.md)
  <!-- - [Features](#features) -->
  <!-- - [Documentation](#documentation) -->
  <!-- - [Simple Usage](#simple-usage) -->

## Installation

### Install via npm

```
$ npm i @rikughi/web-components
```

### Or

```javascript
<script type="module" src="https://unpkg.com/@rikughi/web-components@{VERSION}/dist/web-components/web-components.esm.js"></script>
```

## DatePicker

- [Properties](src/components/date-picker/readme.md)
- [Usage](#datepicker-usage)

### DatePicker Usage

Set target property to id of input element

```javascript
<div style="position: relative;">
  <input id="date-picker" type="text" />
  <date-picker target="date-picker"></date-picker>
</div>
```

### defaultStyle

You can customize the style according to your preferences

- Default

  ![Bottom Sheet Tagihan](/docs/assets/img/default_date_picker.png)

- Customized
  ```javascript
  <date-picker target="date-picker" default-style='{"--green-600":"#0284c7", "--green-50":"#eff6ff"}'></date-picker>
  ```
  ![Bottom Sheet Tagihan](/docs/assets/img/customized_date_picker.png)
- The provided properties
  | Property | Default |
  | --------------- | ----------- |
  | `--gray-50` | `#f9fafb` |
  | `--gray-300` | `#d1d5db` |
  | `--gray-900` | `#111827` |
  | `--green-50` | `#f0fdf4` |
  | `--green-600` | `#16a34a` |
  | `--red-300` | `#fca5a5` |
  | `--red-600` | `#dc2626` |
  | `--white` | `#ffffff` |
  | `--font-family` | `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif` |

### defaultValue

```javascript
<date-picker target="date-picker" default-value="2023-09-01"></date-picker>
```

### displayFormat

```javascript
const datePicker = document.querySelector('[target="date-picker"]');

datePicker.displayFormat = d => {
  return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
};
```

### minDate

```javascript
datePicker.minDate = new Date('2023-09-01');
```

### maxDate

```javascript
datePicker.maxDate = new Date('2023-09-20');
```

### valueChanged

```javascript
datePicker.valueChanged = v => {
  console.log(v);
};
```

## DateRangePicker

- [Properties](src/components/date-range-picker/readme.md)
- [Usage](#daterangepicker-usage)

### DateRangePicker Usage

Set target property to id of input element

```javascript
<div style="position: relative;">
  <input id="date-range-picker" type="text" />
  <date-range-picker target="date-range-picker"></date-range-picker>
</div>
```

![Bottom Sheet Tagihan](/docs/assets/img/default_date_range_picker.png)

### defaultValue

```javascript
const dateRangePicker = document.querySelector('[target="date-range-picker"]');

dateRangePicker.defaultValue = {
  startDate: new Date(2023, 8, 11),
  endDate: new Date(2023, 8, 15),
};

// or

dateRangePicker.defaultValue = {
  startDate: null,
  endDate: null,
};
```

### placeholder

You must use the `use-confirmation` property to use `placeholder` property

```javascript
<date-range-picker target="date-range-picker" use-confirmation placeholder="DD/MM/YYYY"></date-range-picker>
```

### rangeValueChanged

```javascript
dateRangePicker.rangeValueChanged = v => {
  console.log(v);
};
```

### separator

```javascript
<date-range-picker target="date-range-picker" separator=" to "></date-range-picker>
```

### shortcutList

```javascript
const currentDate = new Date();
dateRangePicker.shortcutList = [
  {
    label: 'This month',
    range: {
      startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      endDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
    },
  },
  {
    label: 'This year',
    range: {
      startDate: new Date(currentDate.getFullYear(), 0, 1),
      endDate: new Date(currentDate.getFullYear(), 12, 0),
    },
  },
];
```

### useConfirmation

```javascript
<date-range-picker target="date-range-picker" use-confirmation></date-range-picker>
```
