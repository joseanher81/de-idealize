// This method generates an array of numbers in a given range
export const ageGenerator = (start, stop) =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i);

// This method checks wether a string contains an email or a phone number
export const isValid = (msg) => {
  let valid = true;
  const trimmedMsg = msg.replace(/\s+/g, "");

  // Email
  if (
    trimmedMsg.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gim)
      ?.length > 0
  )
    valid = false;

  //Phone number
  if (
    trimmedMsg.match(
      /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/gim
    )?.length > 0
  )
    valid = false;

  return valid;
};
