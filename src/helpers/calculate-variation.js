const calculateVariation = ({ last, open }) => (((last / open) - 1) * 100).toFixed(2);

export default calculateVariation;
