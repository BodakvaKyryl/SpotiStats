// Function to generate a consistent hash from a string
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

type GradientType = "linear" | "radial" | "conic" | "mesh" | "diagonal";

const gradientTypes: GradientType[] = ["linear", "mesh", "radial"];

const colorSets = [
  ["#FF6B6B", "#4ECDC4", "#45B7D1"],
  ["#A8E6CF", "#DCEDC1", "#FFD3B6", "#FFAAA5"],
  ["#43E97B", "#38F9D7", "#1E96FC", "#0F52BA"],
  ["#FF9A9E", "#FAD0C4", "#FCD1FF", "#A6C1EE", "#84FAB0"],
  ["#FF512F", "#FF8C42", "#FDB64E", "#FFD93D"],
  ["#4776E6", "#8E54E9", "#FF4E50"],
  ["#16A085", "#48B1BF", "#73C8A9", "#99E2B4"],
  ["#FF0099", "#FF6B6B", "#FF9A8B", "#FFBF81"],
  ["#4FACFE", "#00F2FE", "#19EFDC", "#32CD32"],
  ["#000000", "#3D3D3D", "#6B6B6B", "#AAAAAA"],
  ["#F700FF", "#00DBDE", "#FC00FF"],
  ["#00F5A0", "#00D9F5", "#00A8E8", "#4361EE"],
  ["#FF00CC", "#333399", "#FF0000"],
  ["#AF8DFF", "#5EC7FF", "#00FFCC"],
  ["#FF00C7", "#51FF00", "#00FFFF"],
  ["#FFDDE1", "#EE9CA7", "#C9D6FF", "#E2D1C3"],
  ["#A9F1DF", "#FFBBBB", "#DDD6F3", "#B5D8EB"],
  ["#FFEFBA", "#FFFFFF", "#E6F8FF", "#D1F7FF"],
  ["#FFE2E2", "#FFC7C7", "#FFB6B6", "#FFACAC"],
  ["#E0FFED", "#CFFFE5", "#C0FFE0", "#A2E1DB"],
  ["#232526", "#414345", "#656F78", "#9AA5B1"],
  ["#16222A", "#3A6073", "#5D8CAE", "#7FB3D5"],
  ["#1A2980", "#26D0CE", "#02AAB0", "#00CDAC"],
  ["#000000", "#3D3D3D", "#6B6B6B", "#AAAAAA"],
  ["#614385", "#516395", "#649173", "#DBD5A4"],
  ["#BA8B02", "#C27500", "#CB9800", "#E3B505"],
  ["#134E5E", "#71B280", "#AABD8C", "#F4E87C"],
  ["#5D4037", "#795548", "#A1887F", "#BCAAA4"],
  ["#A7BFE8", "#6190E8", "#7F7FD5", "#91EAE4"],
  ["#EB3349", "#F45C43", "#FF7C59", "#FFB347"],
  ["#8360C3", "#2EBF91", "#76B852", "#C9FFB3"],
  ["#FFC371", "#FF5F6D", "#FF758C", "#FFA69E"],
  ["#396AFC", "#2948FF", "#734AE8", "#7B4EFF"],
  ["#F6F0EA", "#D9E4DD", "#CDC9C3", "#555555"],
  ["#ECE9E6", "#FFFFFF", "#F0F2F5", "#DFE0DF"],
  ["#EDEDED", "#E0E0E0", "#DADADA", "#BEBEBE"],
  ["#E8DFCA", "#D5BDAF", "#EDCDBB", "#EDDBC7"],
  ["#D4E7EE", "#C8D9DF", "#BCCAD2", "#9EAFB9"],
  ["#F3E7D3", "#E6D3B3", "#C3B091", "#A3876F"],
  ["#B83F87", "#6A5ACD", "#00CDCD", "#00CD66"],
  ["#EF3B36", "#FFFFFF", "#41B4E6", "#140F2D"],
  ["#7F00FF", "#E100FF", "#FF9E9E", "#00FFFF"],
  ["#0A0026", "#0A004D", "#7301FA", "#F900CF"],
  ["#FFDE17", "#4C8CF1", "#4CE187", "#F14C4C"],
];

const getGradientForGenre = (genreName: string) => {
  const hash = hashString(genreName);
  const setIndex = hash % colorSets.length;
  const colorSet = colorSets[setIndex];
  const gradientTypeIndex = hash % gradientTypes.length;
  const gradientType = gradientTypes[gradientTypeIndex];

  if (gradientType === "mesh") {
    const positions = ["center", "top left", "top right", "bottom left", "bottom right"];
    const position = positions[hash % positions.length];
    const sizeVariation = 100 + (hash % 150);

    return `radial-gradient(circle at ${position}, ${colorSet[0]} 0%, transparent ${sizeVariation}%), 
            radial-gradient(circle at ${positions[(hash + 2) % positions.length]}, ${colorSet[1]} 0%, transparent ${sizeVariation - 30}%), 
            radial-gradient(circle at ${positions[(hash + 4) % positions.length]}, ${colorSet[colorSet.length - 1]} 0%, transparent ${sizeVariation - 60}%)`;
  }

  const stops = colorSet.map((color, index) => {
    const percentage = (index / (colorSet.length - 1)) * 100;
    return `${color} ${percentage}%`;
  });

  switch (gradientType) {
    case "radial":
      const shapes = ["circle", "ellipse"];
      const shape = shapes[hash % shapes.length];
      const positions = ["center", "top left", "top right", "bottom left", "bottom right"];
      const position = positions[(hash + 3) % positions.length];
      return `radial-gradient(${shape} at ${position}, ${stops.join(", ")})`;

    case "conic":
      const angle = hash % 360;
      return `conic-gradient(from ${angle}deg, ${stops.join(", ")})`;

    case "diagonal":
      const diagonalAngle = 45 + (hash % 2) * 90;
      return `linear-gradient(${diagonalAngle}deg, ${stops.join(", ")})`;

    default:
      const linearAngle = hash % 360;
      return `linear-gradient(${linearAngle}deg, ${stops.join(", ")})`;
  }
};

export default getGradientForGenre;
