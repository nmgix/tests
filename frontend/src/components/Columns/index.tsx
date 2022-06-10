import { CargoItem } from "../App/App";
import "./coulmns.scss";

const Columns: React.FC<{ data: CargoItem[] }> = ({ data }) => {
  return (
    <table>
      <tbody>
        <tr>
          {Object.keys(data[0]).map((title) => (
            <td key={title}>{title}</td>
          ))}
        </tr>
        {data.map((element) => (
          <tr key={element.id}>
            {Object.keys(element).map((key) => {
              // <td key={key}>{element[key as keyof CargoItem]!.toString()}</td>
              var data = element[key as keyof CargoItem]!;
              if (key == "date") {
                var formatter = new Intl.DateTimeFormat("ru", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                });

                data = formatter.format(new Date(data));
              }
              return <td key={key}>{data.toString()}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Columns;
