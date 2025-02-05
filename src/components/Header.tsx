import { useTheme } from "@/context/theme-context"
import { Moon, Sun } from "lucide-react";
import { InputNumber } from "antd";

interface Props {
    grid: (size: number) => void
}

const Header = ({ grid }: Props) => {

    const { theme, setTheme } = useTheme()
    const isDark = theme === "dark";

    let max_grid = 10;

    return (
        <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-background/95 py-2 supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto h-16 flex justify-between items-center px-4">
                {/* Image Logo */}
                <img
                    src={isDark ? "/memoremo_dark.png" : "/memoremo_light.png"}
                    alt="Memoremo Logo"
                    className="h-12" />

                {/* Grid Selection */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-x-4 gap-y-2">
                    <div className="flex md:flex-col justify-center items-center gap-1">
                        <label htmlFor="grid" className="font-medium">Grid Size</label>
                        <span className="text-xs">( Max {max_grid} )</span>
                    </div>
                    <InputNumber
                        size="middle"
                        variant="outlined"
                        min={2}
                        max={max_grid}
                        defaultValue={2}
                        onChange={(e) => e && grid(e)}
                    />
                </div>

                {/* Theme Toggler */}
                <div
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className={`flex justify-center items-center cursor-pointer transition-transform duration-500
                    ${isDark ? "rotate-180" : "rotate-0"}`}>
                    {
                        isDark ?
                            <Sun className="size-6 text-yellow-500 rotate-0 transition-all" />
                            :
                            <Moon className="size-6 text-blue-500 rotate-0 transition-all" />
                    }
                </div>
            </div>
        </header>
    )
}

export default Header