import React from 'react'

type Props = {
    csvData: string;
}

export default function CSVTable(props:Props) {
    const {csvData} = props
    const [header, ...rows] = csvData.split('\n')
    return (
        <table>
            <thead>
                <tr>
                    {header.split(',').map(h => (<th>{h}</th>))}
                </tr>
            </thead>
            <tbody>
                {rows.map(row => (
                    <tr>
                        {row.split(',').map(r => (<td>{r}</td>))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}