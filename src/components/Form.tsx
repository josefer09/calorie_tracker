import { Dispatch, useEffect, useState } from "react";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";
import { v4 } from "uuid";

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState, // Le pasamos las acciones, para que sepa que acciones tiene el reducer
};

const initialState: Activity = {
  id: v4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if( state.activeId ) {
      const selectedActivity = state.activities.filter( activityState => activityState.id === state.activeId )[0] // Nos retorna un arreglo, y colocamos en la posicion 0 para que nos devuelva un objeto
      setActivity(selectedActivity) // Seteamos el activity seleccionado para que se coloque en el form
    }
  }, [state.activeId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id); // Retorna true si el target esta sobre alguno de estos input
    // isNumberField? +e.target.value : e.target.value si es true, convertimos el valor a un number, es decir, si es category o calories, setearemos el valor a un number
    setActivity({
      ...activity, // Esto es para no perder la referencia de nuestro objeto completo, ya que si no, sobrescribiria sobre todo el objeto
      [e.target.id]: isNumberField ? +e.target.value : e.target.value, // con el .id obtenemos la Llave del input que fue modificado, mientras que con el value, su valor, de esta manera y con el html, sabemos que input corresponde a nuestro objeto del state
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity; // Crea unas variables nuevas
    console.log(name.trim() !== "" && calories > 0);
    return name.trim() !== "" && calories > 0; // Retorna un true cuando pase la validacion
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({...initialState,
      id: v4(), // De esta forma rescribira todo pero cambia el id, asi todos tendran un id diferente
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" space-y-5 bg-white shadow p-10 rounded-lg"
      >
        <div className=" grid grid-cols-1 gap-3">
          <label htmlFor="category">Category:</label>
          <select
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
            value={activity.category}
            onChange={(e) => handleChange(e)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name">Activity:</label>
          <input
            id="name"
            type="text"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ex. Food, Orange Juice, Salad, Exercise"
            value={activity.name}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calories">Calories:</label>
          <input
            id="calories"
            type="number"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Calories. ex: 200"
            value={activity.calories}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <input
          type="submit"
          className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
          value={activity.category === 1 ? "Save Food" : "Save Exercise"}
          disabled={!isValidActivity()}
        />
      </form>
    </>
  );
}
