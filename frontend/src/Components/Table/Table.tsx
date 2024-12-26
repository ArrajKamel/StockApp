import "./Table.css";

type Props = {
    config: any;
    data: any;
};

const Table = ({ config, data }: Props) => {
    const renderedRows = data.map((company: any) => {
        return (
            <tr className="table-row" key={company.cik}>
                {config.map((val: any) => {
                    return <td className="table-cell">{val.render(company)}</td>;
                })}
            </tr>
        );
    });

    const renderedHeaders = config.map((config: any) => {
        return (
            <th className="table-header-cell" key={config.label}>
                {config.label}
            </th>
        );
    });

    return (
        <div className="table-container">
            <table className="table">
                <thead className="table-header">{renderedHeaders}</thead>
                <tbody>{renderedRows}</tbody>
            </table>
        </div>
    );
};

export default Table;
