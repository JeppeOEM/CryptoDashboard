import { create } from "zustand";

interface ICounterStore {
counter: number;
increment: () => void;
decrease: () => void;
reset: () => void;
}

class CounterStore {
    counter: number
    constructor(){
    this.counter = 0;
    }

    useCounterStore(){
        this.counter = 0;
        return create<ICounterStore>((set) => {
            return {
                counter: 0,
                increment: () => set((store) => ({ counter: store.counter + 1 })),
                decrease: () => set((store) => ({ counter: store.counter - 1 })),
                reset: () => set(() => ({ counter: 0 }))
            }})
    }

}
export default CounterStore