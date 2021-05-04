import moment from 'moment';
import isNil from '../isNil';

var parseValueToMoment = function parseValueToMoment(value, formatter) {
  if (isNil(value) || moment.isMoment(value)) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(function (v) {
      return parseValueToMoment(v, formatter);
    });
  }

  return moment(value, formatter);
};

export default parseValueToMoment;