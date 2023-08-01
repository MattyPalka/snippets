import type { FC, ReactNode } from "react";
import { createContext, useContext } from "react";

type ContextType<T> = [
  useConsumer: ConsumerType<T>,
  Provider: FC<{ children: ReactNode; value?: Partial<T> }>
];
type ConsumerType<T> = () => T;
type Hook<T> = () => T;

export const makeContext = function makeContext<T>(
  contextHook: Hook<T>
): ContextType<T> {
  const Context = createContext<T | null>(null);
  const Provider = ({ ...rest }) => (
    <Context.Provider value={contextHook()} {...rest} />
  );

  const useConsumer = (): T => {
    const contextValue = useContext(Context);

    if (contextValue === null) {
      throw new Error("Used outside of the provider");
    }

    return contextValue;
  };

  return [useConsumer, Provider];
};
