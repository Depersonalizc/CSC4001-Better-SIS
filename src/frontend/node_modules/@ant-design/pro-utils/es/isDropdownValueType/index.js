var isDropdownValueType = function isDropdownValueType(valueType) {
  var isDropdown = false;

  if (/^date/.test(valueType) || valueType === 'select') {
    isDropdown = true;
  }

  return isDropdown;
};

export default isDropdownValueType;