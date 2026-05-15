const COLORS = [
  { value: "amber", label: "Naranja", bg: "bg-[#F26A2E]", ring: "ring-[#F26A2E]" },
  { value: "morado", label: "Morado", bg: "bg-[#C8B6E2]", ring: "ring-[#C8B6E2]" },
  { value: "coral", label: "Coral", bg: "bg-[#F09BB8]", ring: "ring-[#F09BB8]" },
  { value: "cyan", label: "Cian", bg: "bg-[#C4E27A]", ring: "ring-[#C4E27A]" },
  { value: "teal", label: "Verde", bg: "bg-[#C8E6C9]", ring: "ring-[#C8E6C9]" },
  { value: "orange", label: "Naranja", bg: "bg-[#F26A2E]", ring: "ring-[#F26A2E]" },
];

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLORS.map((color) => (
        <button
          key={color.value}
          type="button"
          onClick={() => onChange(color.value)}
          className={`h-10 w-10 rounded-full ${color.bg} transition-all ${
            value === color.value ? `ring-2 ring-white scale-110` : "opacity-50 hover:opacity-80"
          } active:scale-[0.95]`}
          title={color.label}
        />
      ))}
    </div>
  );
}
