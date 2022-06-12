import { CargoItem } from "../../types";
import "./columns.scss";

const Columns: React.FC<{ data: CargoItem[]; currentPage: number; limit: number }> = ({ data, currentPage, limit }) => {
  return (
    <table>
      <tbody>
        <tr>
          {Object.keys(data[0]).map((title) => (
            <td key={title}>{title}</td>
          ))}
        </tr>
        {data.slice(currentPage * limit - limit, currentPage * limit).map((element) => (
          <tr key={element.id}>
            {Object.keys(element).map((key) => {
              // <td key={key}>{element[key as keyof CargoItem]!.toString()}</td>
              var data = element[key as keyof CargoItem]!;
              try {
                if (key == "date") {
                  var formatter = new Intl.DateTimeFormat("ru", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  });

                  data = formatter.format(new Date(data));
                }
              } catch (error) {
                console.log(error);
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
