import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface PlaygroundProps {
    grid_size: number,
}

const Playground = ({ grid_size }: PlaygroundProps) => {

    var totalpairs = Math.floor((grid_size * grid_size) / 2);

    const [arr, setArr] = useState<{ id: number; number: number; }[]>([]);

    const [flipped, setFlipped] = useState<Array<number>>([])
    const [solved, setSolved] = useState<Array<number>>([])
    const [disabled, setDisabled] = useState(false)
    const [won, setWon] = useState(false);

    const ref = useRef<any>([]);

    const initializeGame = () => {

        setFlipped([]);
        setSolved([]);
        setDisabled(false);
        setWon(false);

        let initial = 0;
        const numbers: { id: number; number: number; }[] = [];

        const randomGenerator = () => {
            return Math.floor(Math.random() * totalpairs) + 1;
        }

        const duplicateChecker = (value: number) => {
            return numbers.filter(item => item["number"] == value).length;
        }

        while (initial < (totalpairs * 2)) {
            var random = randomGenerator();

            if (duplicateChecker(random) < 2) {
                numbers.push({ "id": initial, "number": random });
                initial++;
            }
        }
        setArr(numbers)
    }

    useEffect(() => {
        initializeGame();
    }, [grid_size])

    const checkMatch = (secondId: number) => {
        const [firstId] = flipped;

        if (arr[firstId].number === arr[secondId].number) {
            setSolved([...solved, firstId, secondId]);
            setFlipped([]);
            setDisabled(false);
        }
        else {
            setTimeout(() => {
                setFlipped([]);
                setDisabled(false);
            }, 1000)
        }
    }

    const handleClick = (id: number) => {
        if (disabled || won || solved.includes(id)) return;

        if (flipped.length === 0) {
            setFlipped([id]);
            return;
        }

        if (flipped.length === 1) {
            setDisabled(true);

            if (id !== flipped[0]) {
                setFlipped([...flipped, id])

                // Checking for Match
                checkMatch(id);
            }
            else {
                setFlipped([]);
                setDisabled(false)
            }
        }
    }

    const isFlipped = (id: number) => flipped.includes(id) || solved.includes(id);
    const isSolved = (id: number) => solved.includes(id)

    useEffect(() => {
        if (solved.length === arr.length && arr.length > 0) {
            setWon(true);
            ref.current[0].focus();
        }
    }, [solved, arr])

    console.log(arr)

    return (
        <div className="flex flex-col justify-center items-center min-h-screen container mx-auto p-4">
            <div className={`grid gap-3`}
                style={{
                    gridTemplateColumns: `repeat(${grid_size},minmax(0,1fr))`,
                    width: `min(100%,${grid_size * 6}rem)`
                }}>
                {
                    arr.map((card) =>
                        <div
                            className={`flex justify-center items-center tracking-widest aspect-square rounded-lg font-semibold cursor-pointer select-none text-lg transition-all dark:text-gray-700
                                    ${isFlipped(card.id) ?
                                    (isSolved(card.id) ?
                                        "bg-green-600 text-white dark:text-white" :
                                        "bg-blue-600 text-white dark:text-white")
                                    : "bg-muted-foreground"
                                }`}
                            onClick={() => handleClick(card.id)}
                            key={card.id}
                        >
                            {isFlipped(card.id) ? card.number : "?"}
                        </div>
                    )
                }
            </div>

            <div className="mt-12 flex flex-col justify-center items-center gap-5">
                {
                    won &&
                    <div className="text-2xl font-bold tracking-tight text-green-600 animate-bounce">
                        Hurray You Have Won the Game
                    </div>
                }
                <Button
                    ref={(e) => ref.current[0] = e}
                    size={"lg"}
                    className="bg-red-600 hover:bg-red-700 transition-colors duration-300"
                    onClick={initializeGame}>
                    {
                        won ? "Play Again" : "Reset Game"
                    }
                </Button>
            </div>
        </div>
    )
}

export default Playground