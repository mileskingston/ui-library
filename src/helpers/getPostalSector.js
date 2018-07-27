import normalizePostCode from './normalizePostCode/gb'; // TODO: revert when PCC is prepared for Ireland
import regularExpressions from '../config/regularExpressions/gb'; // TODO: revert when PCC is prepared for Ireland

export default function getPostalSector(postcode) {
  const formattedCode = normalizePostCode(postcode);
  const validationPattern = new RegExp(regularExpressions.POSTAL_SECTOR);
  return formattedCode.match(validationPattern)
    ? formattedCode.match(validationPattern)[0]
    : null;
}
