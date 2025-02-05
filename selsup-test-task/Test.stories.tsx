import React, { CSSProperties } from "react";

interface Props {
  params: Param[];
  model: Model;
}
interface Param {
  id: number;
  name: string;
  type: React.HTMLInputTypeAttribute;
}
interface Model {
  paramValues: ParamValue[];
  // colors: Color[];
}
interface ParamValue {
  id: number;
  value: string | ReadonlyArray<string> | number | undefined;
}

class ParamEditor extends React.PureComponent<Props, Model> {
  constructor(props: Props) {
    super(props);

    this.state = {
      // сделано для того, чтобы если в modal не хвататет информации, указанной в params, добавить пустое значение
      paramValues: this.props.params.map((param) => {
        var modelData = this.props.model.paramValues.find((modalProp) => modalProp.id === param.id);
        if (modelData) {
          return {
            id: modelData.id,
            value: modelData.value,
          };
        } else {
          return {
            id: param.id,
            value: "",
          };
        }
      }),
    };
  }

  public updateValue(e: React.ChangeEvent<HTMLInputElement>, propId: number) {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((param) => {
        if (param.id === propId) {
          param.value = e.target.value;
        }
        return param;
      }),
    }));
  }

  public getModel(): Model {
    return {
      paramValues: this.state.paramValues,
    };
  }

  render() {
    return (
      <div>
        <button onClick={() => console.log(this.getModel())}>Get tree</button>
        <ul>
          {this.props.params.map((propParam) => {
            var exactParam = this.state.paramValues.find((stateParam) => stateParam.id === propParam.id);
            if (!exactParam) {
              return <ParamCell value={""} updateValue={(e) => this.updateValue(e, propParam.id)} {...propParam} />;
            }
            return (
              <ParamCell
                value={exactParam.value}
                updateValue={(e) => this.updateValue(e, propParam.id)}
                {...propParam}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

type ParamCellProps = ParamValue &
  Param & { updateValue: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void };
const ParamCell: React.FC<ParamCellProps> = React.memo(
  ({ id, name, type, updateValue, value }) => {
    const cellStyle: CSSProperties = {
      listStyleType: "none",
      display: "flex",
      margin: "0.5em 0",
    };
    const titleStyle: CSSProperties = {
      margin: "0.5rem",
    };

    return (
      <li key={id} style={cellStyle}>
        <h3 style={titleStyle}>{name}</h3>
        <input value={value} onChange={(e) => updateValue(e, id)} type={type} />
      </li>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

// можно удалить, если не хотите использовать Storybook
// import { ComponentStory, ComponentMeta } from "@storybook/react";

// export default {
//   title: "ParamEditor",
//   component: ParamEditor,
// } as ComponentMeta<typeof ParamEditor>;

// const GenericParamEditor: ComponentStory<typeof ParamEditor> = (args) => <ParamEditor {...args} />;

// export const DefaultParamEditor = GenericParamEditor.bind({});
// DefaultParamEditor.args = {
//   params: [
//     {
//       id: 1,
//       name: "Назначение",
//       type: "text",
//     },
//     {
//       id: 2,
//       name: "Длина",
//       type: "text",
//     },
//   ],
//   model: {
//     paramValues: [
//       {
//         id: 1,
//         value: "повседневное",
//       },
//       {
//         id: 2,
//         value: "макси",
//       },
//     ],
//   },
// };

// export const ModelNotDefinedParamEditor = GenericParamEditor.bind({});
// ModelNotDefinedParamEditor.args = {
//   params: [
//     {
//       id: 1,
//       name: "Расстояние",
//       type: "text",
//     },
//     {
//       id: 2,
//       name: "Вес",
//       type: "text",
//     },
//     {
//       id: 3,
//       name: "Время",
//       type: "text",
//     },
//   ],
// };

// export const OtherFiledTypesParamEditor = GenericParamEditor.bind({});
// OtherFiledTypesParamEditor.args = {
//   params: [
//     {
//       id: 1,
//       name: "Дата встречи",
//       type: "date",
//     },
//     {
//       id: 2,
//       name: "Дата окончания",
//       type: "date",
//     },
//     {
//       id: 3,
//       name: "Категория",
//       type: "date",
//     },
//   ],
//   model: {
//     paramValues: [
//       {
//         id: 1,
//         value: new Date().toISOString().split("T")[0],
//       },
//       {
//         id: 2,
//         value: "",
//       },
//     ],
//   },
// };
