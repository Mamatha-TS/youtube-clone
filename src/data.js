export const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const value_converter = (value) => {
  if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
  if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
  return value;
};
