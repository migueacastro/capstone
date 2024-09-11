import { s as subscribe, a as compute_rest_props, c as compute_slots } from "./utils.js";
import { c as create_ssr_component, f as createEventDispatcher, e as escape, a as each, g as spread, j as escape_attribute_value, h as escape_object, d as add_attribute, v as validate_component } from "./ssr.js";
import "./client.js";
import { g as getToastStore } from "./stores3.js";
import { p as prefersReducedMotionStore } from "./ProgressBar.svelte_svelte_type_style_lang.js";
import { s as slide, f as fly, a as scale } from "./index2.js";
import { p as page } from "./stores4.js";
import { w as writable } from "./index.js";
const Autocomplete = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let listedOptions;
  let optionsFiltered;
  let sliceLimit;
  let classesBase;
  let classesNav;
  let classesList;
  let classesItem;
  let classesButton;
  let classesEmpty;
  let $prefersReducedMotionStore, $$unsubscribe_prefersReducedMotionStore;
  $$unsubscribe_prefersReducedMotionStore = subscribe(prefersReducedMotionStore, (value) => $prefersReducedMotionStore = value);
  createEventDispatcher();
  let { input = void 0 } = $$props;
  let { options = [] } = $$props;
  let { limit = void 0 } = $$props;
  let { allowlist = [] } = $$props;
  let { denylist = [] } = $$props;
  let { emptyState = "No Results Found." } = $$props;
  let { regionNav = "" } = $$props;
  let { regionList = "list-nav" } = $$props;
  let { regionItem = "" } = $$props;
  let { regionButton = "w-full" } = $$props;
  let { regionEmpty = "text-center" } = $$props;
  let { filter = filterOptions } = $$props;
  let { transitions = !$prefersReducedMotionStore } = $$props;
  let { transitionIn = slide } = $$props;
  let { transitionInParams = { duration: 200 } } = $$props;
  let { transitionOut = slide } = $$props;
  let { transitionOutParams = { duration: 200 } } = $$props;
  function filterByAllowDeny(allowlist2, denylist2) {
    let _options = [...options];
    if (allowlist2.length) {
      _options = _options.filter((option) => allowlist2.includes(option.value));
    }
    if (denylist2.length) {
      _options = _options.filter((option) => !denylist2.includes(option.value));
    }
    if (!allowlist2.length && !denylist2.length) {
      _options = options;
    }
    listedOptions = _options;
  }
  function filterOptions() {
    let _options = [...listedOptions];
    _options = _options.filter((option) => {
      const inputFormatted = String(input).toLowerCase().trim();
      let optionFormatted = JSON.stringify([option.label, option.value, option.keywords]).toLowerCase();
      if (optionFormatted.includes(inputFormatted)) return option;
    });
    return _options;
  }
  if ($$props.input === void 0 && $$bindings.input && input !== void 0) $$bindings.input(input);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  if ($$props.limit === void 0 && $$bindings.limit && limit !== void 0) $$bindings.limit(limit);
  if ($$props.allowlist === void 0 && $$bindings.allowlist && allowlist !== void 0) $$bindings.allowlist(allowlist);
  if ($$props.denylist === void 0 && $$bindings.denylist && denylist !== void 0) $$bindings.denylist(denylist);
  if ($$props.emptyState === void 0 && $$bindings.emptyState && emptyState !== void 0) $$bindings.emptyState(emptyState);
  if ($$props.regionNav === void 0 && $$bindings.regionNav && regionNav !== void 0) $$bindings.regionNav(regionNav);
  if ($$props.regionList === void 0 && $$bindings.regionList && regionList !== void 0) $$bindings.regionList(regionList);
  if ($$props.regionItem === void 0 && $$bindings.regionItem && regionItem !== void 0) $$bindings.regionItem(regionItem);
  if ($$props.regionButton === void 0 && $$bindings.regionButton && regionButton !== void 0) $$bindings.regionButton(regionButton);
  if ($$props.regionEmpty === void 0 && $$bindings.regionEmpty && regionEmpty !== void 0) $$bindings.regionEmpty(regionEmpty);
  if ($$props.filter === void 0 && $$bindings.filter && filter !== void 0) $$bindings.filter(filter);
  if ($$props.transitions === void 0 && $$bindings.transitions && transitions !== void 0) $$bindings.transitions(transitions);
  if ($$props.transitionIn === void 0 && $$bindings.transitionIn && transitionIn !== void 0) $$bindings.transitionIn(transitionIn);
  if ($$props.transitionInParams === void 0 && $$bindings.transitionInParams && transitionInParams !== void 0) $$bindings.transitionInParams(transitionInParams);
  if ($$props.transitionOut === void 0 && $$bindings.transitionOut && transitionOut !== void 0) $$bindings.transitionOut(transitionOut);
  if ($$props.transitionOutParams === void 0 && $$bindings.transitionOutParams && transitionOutParams !== void 0) $$bindings.transitionOutParams(transitionOutParams);
  listedOptions = options;
  {
    filterByAllowDeny(allowlist, denylist);
  }
  optionsFiltered = input ? filter() : listedOptions;
  sliceLimit = limit ?? optionsFiltered.length;
  classesBase = `${$$props.class ?? ""}`;
  classesNav = `${regionNav}`;
  classesList = `${regionList}`;
  classesItem = `${regionItem}`;
  classesButton = `${regionButton}`;
  classesEmpty = `${regionEmpty}`;
  $$unsubscribe_prefersReducedMotionStore();
  return ` <div class="${"autocomplete " + escape(classesBase, true)}" data-testid="autocomplete">${optionsFiltered.length > 0 ? `<nav class="${"autocomplete-nav " + escape(classesNav, true)}"><ul class="${"autocomplete-list " + escape(classesList, true)}">${each(optionsFiltered.slice(0, sliceLimit), (option) => {
    return `<li class="${"autocomplete-item " + escape(classesItem, true)}"><button class="${"autocomplete-button " + escape(classesButton, true)}" type="button"><!-- HTML_TAG_START -->${option.label}<!-- HTML_TAG_END --></button> </li>`;
  })}</ul></nav>` : `<div class="${"autocomplete-empty " + escape(classesEmpty, true)}"><!-- HTML_TAG_START -->${emptyState}<!-- HTML_TAG_END --></div>`}</div>`;
});
const cBase$2 = "textarea relative flex justify-center items-center";
const cInput = "w-full absolute top-0 left-0 right-0 bottom-0 z-[1] opacity-0 disabled:!opacity-0 cursor-pointer";
const cInterface = "flex justify-center items-center text-center";
const FileDropzone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesInput;
  let classesInterface;
  let $$restProps = compute_rest_props($$props, [
    "files",
    "fileInput",
    "name",
    "border",
    "padding",
    "rounded",
    "regionInterface",
    "regionInterfaceText",
    "slotLead",
    "slotMessage",
    "slotMeta"
  ]);
  let $$slots = compute_slots(slots);
  let { files = void 0 } = $$props;
  let { fileInput = void 0 } = $$props;
  let { name } = $$props;
  let { border = "border-2 border-dashed" } = $$props;
  let { padding = "p-4 py-8" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { regionInterface = "" } = $$props;
  let { regionInterfaceText = "" } = $$props;
  let { slotLead = "mb-4" } = $$props;
  let { slotMessage = "" } = $$props;
  let { slotMeta = "opacity-75" } = $$props;
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.files === void 0 && $$bindings.files && files !== void 0) $$bindings.files(files);
  if ($$props.fileInput === void 0 && $$bindings.fileInput && fileInput !== void 0) $$bindings.fileInput(fileInput);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0) $$bindings.border(border);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0) $$bindings.rounded(rounded);
  if ($$props.regionInterface === void 0 && $$bindings.regionInterface && regionInterface !== void 0) $$bindings.regionInterface(regionInterface);
  if ($$props.regionInterfaceText === void 0 && $$bindings.regionInterfaceText && regionInterfaceText !== void 0) $$bindings.regionInterfaceText(regionInterfaceText);
  if ($$props.slotLead === void 0 && $$bindings.slotLead && slotLead !== void 0) $$bindings.slotLead(slotLead);
  if ($$props.slotMessage === void 0 && $$bindings.slotMessage && slotMessage !== void 0) $$bindings.slotMessage(slotMessage);
  if ($$props.slotMeta === void 0 && $$bindings.slotMeta && slotMeta !== void 0) $$bindings.slotMeta(slotMeta);
  classesBase = `${cBase$2} ${border} ${padding} ${rounded} ${$$props.class ?? ""}`;
  classesInput = `${cInput}`;
  classesInterface = `${cInterface}`;
  return `<div class="${[
    "dropzone " + escape(classesBase, true),
    $$restProps.disabled ? "opacity-50" : ""
  ].join(" ").trim()}" data-testid="file-dropzone">  <input${spread(
    [
      { type: "file" },
      { name: escape_attribute_value(name) },
      {
        class: "dropzone-input " + escape(classesInput, true)
      },
      escape_object(prunedRestProps())
    ],
    {}
  )}>  <div class="${"dropzone-interface " + escape(classesInterface, true) + " " + escape(regionInterface, true)}"><div class="${"dropzone-interface-text " + escape(regionInterfaceText, true)}"> ${$$slots.lead ? `<div class="${"dropzone-lead " + escape(slotLead, true)}">${slots.lead ? slots.lead({}) : ``}</div>` : ``}  <div class="${"dropzone-message " + escape(slotMessage, true)}">${slots.message ? slots.message({}) : `<strong data-svelte-h="svelte-13uz6lq">Upload a file</strong> or drag and drop`}</div>  ${$$slots.meta ? `<small class="${"dropzone-meta " + escape(slotMeta, true)}">${slots.meta ? slots.meta({}) : ``}</small>` : ``}</div></div></div>`;
});
const cBase$1 = "textarea cursor-pointer";
const cChipWrapper = "space-y-4";
const cChipList = "flex flex-wrap gap-2";
const cInputField = "unstyled bg-transparent border-0 !ring-0 p-0 w-full";
const InputChip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesInvalid;
  let classesBase;
  let classesChipWrapper;
  let classesChipList;
  let classesInput;
  let $$restProps = compute_rest_props($$props, [
    "input",
    "name",
    "value",
    "whitelist",
    "max",
    "minlength",
    "maxlength",
    "allowUpperCase",
    "allowDuplicates",
    "validation",
    "duration",
    "required",
    "chips",
    "invalid",
    "padding",
    "rounded",
    "regionChipWrapper",
    "regionChipList",
    "regionInput",
    "label",
    "transitions",
    "listTransitionIn",
    "listTransitionInParams",
    "listTransitionOut",
    "listTransitionOutParams",
    "chipTransitionIn",
    "chipTransitionInParams",
    "chipTransitionOut",
    "chipTransitionOutParams",
    "addChip",
    "removeChip"
  ]);
  let $prefersReducedMotionStore, $$unsubscribe_prefersReducedMotionStore;
  $$unsubscribe_prefersReducedMotionStore = subscribe(prefersReducedMotionStore, (value2) => $prefersReducedMotionStore = value2);
  const dispatch = createEventDispatcher();
  let { input = "" } = $$props;
  let { name } = $$props;
  let { value = [] } = $$props;
  let { whitelist = [] } = $$props;
  let { max = -1 } = $$props;
  let { minlength = -1 } = $$props;
  let { maxlength = -1 } = $$props;
  let { allowUpperCase = false } = $$props;
  let { allowDuplicates = false } = $$props;
  let { validation = () => true } = $$props;
  let { duration = 150 } = $$props;
  let { required = false } = $$props;
  let { chips = "variant-filled" } = $$props;
  let { invalid = "input-error" } = $$props;
  let { padding = "p-2" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { regionChipWrapper = "" } = $$props;
  let { regionChipList = "" } = $$props;
  let { regionInput = "" } = $$props;
  let { label = "Chips select" } = $$props;
  let { transitions = !$prefersReducedMotionStore } = $$props;
  let { listTransitionIn = fly } = $$props;
  let { listTransitionInParams = { duration: 150, opacity: 0, y: -20 } } = $$props;
  let { listTransitionOut = fly } = $$props;
  let { listTransitionOutParams = { duration: 150, opacity: 0, y: -20 } } = $$props;
  let { chipTransitionIn = scale } = $$props;
  let { chipTransitionInParams = { duration: 150, opacity: 0 } } = $$props;
  let { chipTransitionOut = scale } = $$props;
  let { chipTransitionOutParams = { duration: 150, opacity: 0 } } = $$props;
  let inputValid = true;
  let chipValues = value?.map((val) => {
    return { val, id: Math.random() };
  }) || [];
  let selectElement;
  function validateCustom(chip) {
    return validation === void 0 || validation(chip);
  }
  function validateCount() {
    return max === -1 || value.length < max;
  }
  function validateLength(chip) {
    return (minlength === -1 || chip.length >= minlength) && (maxlength === -1 || chip.length <= maxlength);
  }
  function validateWhiteList(chip) {
    return whitelist.length === 0 || whitelist.includes(chip);
  }
  function validateDuplicates(chip) {
    return allowDuplicates || !value.includes(chip);
  }
  function validate(chip = "") {
    if (!chip && !input) return false;
    chip = chip !== "" ? chip.trim() : input.trim();
    return validateCustom(chip) && validateCount() && validateLength(chip) && validateWhiteList(chip) && validateDuplicates(chip);
  }
  function addChipCommon(chip) {
    chip = allowUpperCase ? chip : chip.toLowerCase();
    value.push(chip);
    value = value;
    chipValues.push({ val: chip, id: Math.random() });
    chipValues = chipValues;
  }
  function removeChipCommon(chip) {
    let chipIndex = value.indexOf(chip);
    value.splice(chipIndex, 1);
    value = value;
    chipValues.splice(chipIndex, 1);
    chipValues = chipValues;
  }
  function addChip(chip) {
    inputValid = validate(chip);
    if (inputValid === false) {
      dispatch("invalidManually", { input: chip });
      return;
    }
    addChipCommon(chip);
    dispatch("addManually", {
      chipIndex: value.length - 1,
      chipValue: chip
    });
  }
  function removeChip(chip) {
    if ($$restProps.disabled) return;
    removeChipCommon(chip);
    dispatch("removeManually", { chipValue: chip });
  }
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.input === void 0 && $$bindings.input && input !== void 0) $$bindings.input(input);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.whitelist === void 0 && $$bindings.whitelist && whitelist !== void 0) $$bindings.whitelist(whitelist);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
  if ($$props.minlength === void 0 && $$bindings.minlength && minlength !== void 0) $$bindings.minlength(minlength);
  if ($$props.maxlength === void 0 && $$bindings.maxlength && maxlength !== void 0) $$bindings.maxlength(maxlength);
  if ($$props.allowUpperCase === void 0 && $$bindings.allowUpperCase && allowUpperCase !== void 0) $$bindings.allowUpperCase(allowUpperCase);
  if ($$props.allowDuplicates === void 0 && $$bindings.allowDuplicates && allowDuplicates !== void 0) $$bindings.allowDuplicates(allowDuplicates);
  if ($$props.validation === void 0 && $$bindings.validation && validation !== void 0) $$bindings.validation(validation);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.chips === void 0 && $$bindings.chips && chips !== void 0) $$bindings.chips(chips);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0) $$bindings.invalid(invalid);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0) $$bindings.rounded(rounded);
  if ($$props.regionChipWrapper === void 0 && $$bindings.regionChipWrapper && regionChipWrapper !== void 0) $$bindings.regionChipWrapper(regionChipWrapper);
  if ($$props.regionChipList === void 0 && $$bindings.regionChipList && regionChipList !== void 0) $$bindings.regionChipList(regionChipList);
  if ($$props.regionInput === void 0 && $$bindings.regionInput && regionInput !== void 0) $$bindings.regionInput(regionInput);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.transitions === void 0 && $$bindings.transitions && transitions !== void 0) $$bindings.transitions(transitions);
  if ($$props.listTransitionIn === void 0 && $$bindings.listTransitionIn && listTransitionIn !== void 0) $$bindings.listTransitionIn(listTransitionIn);
  if ($$props.listTransitionInParams === void 0 && $$bindings.listTransitionInParams && listTransitionInParams !== void 0) $$bindings.listTransitionInParams(listTransitionInParams);
  if ($$props.listTransitionOut === void 0 && $$bindings.listTransitionOut && listTransitionOut !== void 0) $$bindings.listTransitionOut(listTransitionOut);
  if ($$props.listTransitionOutParams === void 0 && $$bindings.listTransitionOutParams && listTransitionOutParams !== void 0) $$bindings.listTransitionOutParams(listTransitionOutParams);
  if ($$props.chipTransitionIn === void 0 && $$bindings.chipTransitionIn && chipTransitionIn !== void 0) $$bindings.chipTransitionIn(chipTransitionIn);
  if ($$props.chipTransitionInParams === void 0 && $$bindings.chipTransitionInParams && chipTransitionInParams !== void 0) $$bindings.chipTransitionInParams(chipTransitionInParams);
  if ($$props.chipTransitionOut === void 0 && $$bindings.chipTransitionOut && chipTransitionOut !== void 0) $$bindings.chipTransitionOut(chipTransitionOut);
  if ($$props.chipTransitionOutParams === void 0 && $$bindings.chipTransitionOutParams && chipTransitionOutParams !== void 0) $$bindings.chipTransitionOutParams(chipTransitionOutParams);
  if ($$props.addChip === void 0 && $$bindings.addChip && addChip !== void 0) $$bindings.addChip(addChip);
  if ($$props.removeChip === void 0 && $$bindings.removeChip && removeChip !== void 0) $$bindings.removeChip(removeChip);
  classesInvalid = inputValid === false ? invalid : "";
  classesBase = `${cBase$1} ${padding} ${rounded} ${$$props.class ?? ""} ${classesInvalid}`;
  classesChipWrapper = `${cChipWrapper} ${regionChipWrapper}`;
  classesChipList = `${cChipList} ${regionChipList}`;
  classesInput = `${cInputField} ${regionInput}`;
  chipValues = value?.map((val, i) => {
    if (chipValues[i]?.val === val) return chipValues[i];
    return { id: Math.random(), val };
  }) || [];
  $$unsubscribe_prefersReducedMotionStore();
  return `<div class="${[
    "input-chip " + escape(classesBase, true),
    $$restProps.disabled ? "opacity-50" : ""
  ].join(" ").trim()}"> <div class="h-0 overflow-hidden"><select${add_attribute("name", name, 0)} multiple ${required ? "required" : ""}${add_attribute("aria-label", label, 0)} tabindex="-1"${add_attribute("this", selectElement, 0)}>${each(value, (option) => {
    return `<option${add_attribute("value", option, 0)}>${escape(option)}</option>`;
  })}</select></div>  <div class="${"input-chip-wrapper " + escape(classesChipWrapper, true)}"> <input${spread(
    [
      { type: "text" },
      {
        placeholder: escape_attribute_value($$restProps.placeholder ?? "Enter values...")
      },
      {
        class: "input-chip-field " + escape(classesInput, true)
      },
      { disabled: $$restProps.disabled || null },
      escape_object(prunedRestProps())
    ],
    {}
  )}${add_attribute("value", input, 0)}>  ${chipValues.length ? `<div class="${"input-chip-list " + escape(classesChipList, true)}">${each(chipValues, ({ id, val }, i) => {
    return `<div><button type="button" class="${"chip " + escape(chips, true)}"><span>${escape(val)}</span> <span data-svelte-h="svelte-1p578dz">✕</span></button> </div>`;
  })}</div>` : ``}</div></div>`;
});
const cBase = "inline-block";
const cLabel = "unstyled flex items-center";
const cTrack = "flex transition-all duration-[200ms] cursor-pointer";
const cThumb = "w-[50%] h-full scale-[0.8] transition-all duration-[200ms] shadow";
const SlideToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cTrackActive;
  let cThumbBackground;
  let cThumbPos;
  let classesDisabled;
  let classesBase;
  let classesLabel;
  let classesTrack;
  let classesThumb;
  let $$restProps = compute_rest_props($$props, ["name", "checked", "size", "background", "active", "border", "rounded", "label"]);
  let $$slots = compute_slots(slots);
  createEventDispatcher();
  let { name } = $$props;
  let { checked = false } = $$props;
  let { size = "md" } = $$props;
  let { background = "bg-surface-400 dark:bg-surface-700" } = $$props;
  let { active = "bg-surface-900 dark:bg-surface-300" } = $$props;
  let { border = "" } = $$props;
  let { rounded = "rounded-full" } = $$props;
  let { label = "" } = $$props;
  let trackSize;
  switch (size) {
    case "sm":
      trackSize = "w-12 h-6";
      break;
    case "lg":
      trackSize = "w-20 h-10";
      break;
    default:
      trackSize = "w-16 h-8";
  }
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0) $$bindings.background(background);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0) $$bindings.active(active);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0) $$bindings.border(border);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0) $$bindings.rounded(rounded);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  cTrackActive = checked ? active : `${background} cursor-pointer`;
  cThumbBackground = checked ? "bg-white/75" : "bg-white";
  cThumbPos = checked ? "translate-x-full" : "";
  classesDisabled = $$props.disabled === true ? "opacity-50" : "hover:brightness-[105%] dark:hover:brightness-110 cursor-pointer";
  classesBase = `${cBase} ${rounded} ${classesDisabled} ${$$props.class ?? ""}`;
  classesLabel = `${cLabel}`;
  classesTrack = `${cTrack} ${border} ${rounded} ${trackSize} ${cTrackActive}`;
  classesThumb = `${cThumb} ${rounded} ${cThumbBackground} ${cThumbPos}`;
  return `<div${add_attribute("id", label, 0)} class="${"slide-toggle " + escape(classesBase, true)}" data-testid="slide-toggle" role="switch"${add_attribute("aria-label", label, 0)}${add_attribute("aria-checked", checked, 0)} tabindex="0"><label class="${"slide-toggle-label " + escape(classesLabel, true)}"> <input${spread(
    [
      { type: "checkbox" },
      { class: "slide-toggle-input hidden" },
      { name: escape_attribute_value(name) },
      escape_object(prunedRestProps()),
      { disabled: $$props.disabled || null }
    ],
    {}
  )}${add_attribute("checked", checked, 1)}>  <div class="${[
    "slide-toggle-track " + escape(classesTrack, true),
    $$props.disabled ? "cursor-not-allowed" : ""
  ].join(" ").trim()}"><div class="${[
    "slide-toggle-thumb " + escape(classesThumb, true),
    $$props.disabled ? "cursor-not-allowed" : ""
  ].join(" ").trim()}"></div></div>  ${$$slots.default ? `<div class="slide-toggle-text ml-3">${slots.default ? slots.default({}) : ``}</div>` : ``}</label></div>`;
});
const _fieldsStorage = writable([{ type: null, value: null, name: null, tables: null }]);
const LayoutField = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value } = $$props;
  let { seats = 0 } = $$props;
  let selectedRow = -1;
  const getLetter = (number) => {
    return String.fromCharCode(number + 64 + 1);
  };
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.seats === void 0 && $$bindings.seats && seats !== void 0) $$bindings.seats(seats);
  return `<div role="button" tabindex="-1" class="w-full overflow-x-auto"><div role="button" tabindex="-1" class="flex flex-row w-full justify-center">${value ? `<div class="flex flex-col">${each(value, (row, index) => {
    return `<div class="card w-8 h-8 variant-outline m-2 flex justify-center items-center">${escape(getLetter(value.length - 1 - index))}</div>`;
  })}</div> <div class="relative flex flex-row w-fit"><div class="flex flex-col">${each(value, (row, index) => {
    return `<div role="button" tabindex="-1" class="flex flex-row relative w-fit ">${each(row, (seat) => {
      return `${seat.type == "space" ? `<div class="card w-8 h-8 m-2 variant-outline"></div>` : `<div class="card w-8 h-8 variant-filled m-2 flex justify-center items-center">${escape(seat.value)}</div>`}`;
    })} <span role="group" class="${[
      "absolute p-2 -top-0 -right-12 z-10 flex flex-col variant-filled w-fit h-fit rounded-full space-y-4 mx-3",
      selectedRow !== index ? "hidden" : ""
    ].join(" ").trim()}">${value[index].length > 2 ? `<button type="button" data-svelte-h="svelte-lm7hej"><span class="badge-icon z-10 text-xl hover:text-2xl"><i class="fa fa-xmark"></i></span></button>` : ``} ${value[index].length <= 26 ? `<button type="button" data-svelte-h="svelte-10fnqv7"><span class="badge-icon z-10 text-xl"><i class="fa fa-stairs hover:text-2xl"></i></span></button> <button type="button" data-svelte-h="svelte-1y4tw51"><span class="badge-icon z-10 text-xl"><i class="fa fa-plus hover:text-2xl"></i></span> </button>` : ``}</span> </div>`;
  })} <span class="${[
    "variant-filled p-2 mx-3 absolute bottom-3 -left-20 flex flex-row variant-outline w-fit h-fit rounded-full space-x-4",
    "hidden"
  ].join(" ").trim()}">${value.length > 2 ? `<button type="button" data-svelte-h="svelte-trieiy"><span class="badge-icon z-10 text-xl hover:text-2xl "><i class="fa fa-xmark hover:text-2xl"></i></span></button>` : ``} ${value.length <= 26 ? `<button type="button" data-svelte-h="svelte-3ld04a"><span class="badge-icon z-10 text-xl"><i class="fa fa-plus hover:text-2xl"></i></span></button>` : ``}</span> <div class="card variant-filled-primary flex p-1 m-2 justify-center rounded-b-full w-ful" data-svelte-h="svelte-s4mwrs">Screen</div></div></div>` : ``}</div> <p class="text-end">Seats: ${escape(seats)}</p></div>`;
});
const Form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_fieldsStorage, $$unsubscribe__fieldsStorage;
  let $page, $$unsubscribe_page;
  $$unsubscribe__fieldsStorage = subscribe(_fieldsStorage, (value) => $_fieldsStorage = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { name = "" } = $$props;
  let { fields = [
    {
      type: null,
      value: null,
      name: null,
      tables: null,
      hidden: false
    }
  ] } = $$props;
  let { endpointName = "" } = $$props;
  let { edit = false } = $$props;
  $page.params.id;
  let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  let tables = {};
  getToastStore();
  let layoutSeats = 0;
  let manyToManyListsDict = {};
  let inputChipListsDict = {};
  let valueChipListsDict = {};
  let inputChipDict = {};
  let removedOptions = {};
  const addChip = (detail, table) => {
    removedOptions[table] = [...removedOptions[table], detail];
    manyToManyListsDict[table] = manyToManyListsDict[table].filter((item) => item != detail);
    inputChipListsDict[table] = [...inputChipListsDict[table], detail.label];
    valueChipListsDict[table] = [...valueChipListsDict[table], detail.value];
  };
  const InputChipValidation = (value) => {
    return false;
  };
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.fields === void 0 && $$bindings.fields && fields !== void 0) $$bindings.fields(fields);
  if ($$props.endpointName === void 0 && $$bindings.endpointName && endpointName !== void 0) $$bindings.endpointName(endpointName);
  if ($$props.edit === void 0 && $$bindings.edit && edit !== void 0) $$bindings.edit(edit);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        layoutSeats = fields?.find((field) => field.type === "layout")?.seats;
        console.log(layoutSeats);
      }
    }
    $$rendered = `<div class="animate-show"><h2 class="h1 text-start mb-4">${escape(edit ? "Edit" : "Add")} ${escape(capitalizedName)}</h2> <form class="gap-10 flex flex-col lg:flex-row"><div class="card my-3 p-10 text-start lg:w-[75%] space-y-6">${each($_fieldsStorage, (field) => {
      return `<label class="${["label", field?.type === "hidden" ? "hidden" : ""].join(" ").trim()}"${add_attribute("for", field?.type == "object" ? "file" : field?.name, 0)}><p class="capitalize">${escape(field?.name?.replace(/_name/g, " ").replace(/_/g, " "))}</p> ${field?.type === "text" ? `<input class="input" type="text" placeholder=""${add_attribute("id", field.name, 0)}${add_attribute("value", field.value, 0)}>` : `${field?.type === "password" ? `<input class="input" type="password" placeholder=""${add_attribute("id", field.name, 0)}${add_attribute("value", field.value, 0)}>` : `${field?.type === "decimal" ? `<input class="input w-[25%]" type="number" placeholder="" min="0" step="0.01"${add_attribute("id", field.name, 0)}${add_attribute("value", field.value, 0)}>` : `${field?.type === "integer" ? `<input class="input w-[25%]" type="number" placeholder="" min="0"${add_attribute("id", field.name, 0)} ${field?.disabled ? "disabled" : ""}${add_attribute("value", field.value, 0)}>` : `${field?.type === "boolean" ? `${validate_component(SlideToggle, "SlideToggle").$$render(
        $$result,
        {
          id: "toggle-" + field.name,
          checked: field.value
        },
        {
          checked: ($$value) => {
            field.value = $$value;
            $$settled = false;
          }
        },
        {}
      )}` : `${field?.type === "hidden" ? `<input class="input" type="hidden" placeholder=""${add_attribute("id", field.name, 0)}${add_attribute("value", field.value, 0)}>` : `${field?.type === "date" ? `<input class="input" type="date" placeholder=""${add_attribute("id", field.name, 0)}${add_attribute("value", field.value, 0)}>` : `${field?.type === "datetime" ? `<input class="input" type="datetime-local" placeholder=""${add_attribute("id", field.name, 0)}${add_attribute("value", field.value, 0)}>` : `${field?.type === "textarea" ? `<textarea class="textarea" rows="4" placeholder=""${add_attribute("id", field.name, 0)}>${escape(field.value || "")}</textarea>` : `${field?.type === "object" ? `${field.value.length == 0 ? `${validate_component(FileDropzone, "FileDropzone").$$render(
        $$result,
        {
          name: "file",
          fileInput: {
            accept: "image/png, image/jpg, image/jpeg, image/webp"
          },
          id: "file",
          files: field.value
        },
        {
          files: ($$value) => {
            field.value = $$value;
            $$settled = false;
          }
        },
        {
          meta: () => {
            return `PNG, JPG and WEBP allowed.`;
          },
          message: () => {
            return `Upload a picture or drop it here`;
          },
          lead: () => {
            return `<i class="fa-solid fa-upload"></i>`;
          }
        }
      )}` : `<div class="relative inline-block"><button data-svelte-h="svelte-14ts1f"><span class="badge-icon variant-filled-error absolute top-2 -right-2 z-10">x</span></button> <img${add_attribute(
        "src",
        edit && typeof field.value[0] == "string" ? field.value : URL.createObjectURL(field.value[0]),
        0
      )} alt="dropped-file" class="lg:h-[20vh]"> </div>`}` : `${field?.type == "foreignKey" ? `${tables && tables[field.table] ? `<select class="select"${add_attribute("id", field.name, 0)}>${each(tables[field.table], (option) => {
        return `<option${add_attribute("value", option.id, 0)}>${escape(option.name)}</option>`;
      })}</select>` : ``}` : `${field?.type == "manyToMany" ? `${validate_component(InputChip, "InputChip").$$render(
        $$result,
        {
          name: "chips",
          addChip: (event) => addChip(event.detail, field.table),
          validation: InputChipValidation,
          invalid: "",
          input: inputChipDict[field.table],
          value: inputChipListsDict[field.table]
        },
        {
          input: ($$value) => {
            inputChipDict[field.table] = $$value;
            $$settled = false;
          },
          value: ($$value) => {
            inputChipListsDict[field.table] = $$value;
            $$settled = false;
          }
        },
        {}
      )} <div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">${validate_component(Autocomplete, "Autocomplete").$$render(
        $$result,
        {
          options: manyToManyListsDict[field.table],
          input: inputChipDict[field.table]
        },
        {
          input: ($$value) => {
            inputChipDict[field.table] = $$value;
            $$settled = false;
          }
        },
        {}
      )} </div>` : `${field?.type == "layout" ? `${validate_component(LayoutField, "LayoutField").$$render(
        $$result,
        { value: field.value, seats: field.seats },
        {
          value: ($$value) => {
            field.value = $$value;
            $$settled = false;
          },
          seats: ($$value) => {
            field.seats = $$value;
            $$settled = false;
          }
        },
        {}
      )}` : ``}`}`}`}`}`}`}`}`}`}`}`}`} </label>`;
    })} <button type="submit" class="btn variant-filled h-fit w-fit mx-auto btn-xl" data-svelte-h="svelte-1yeez1c">Save</button></div></form></div>`;
  } while (!$$settled);
  $$unsubscribe__fieldsStorage();
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Form as F
};
