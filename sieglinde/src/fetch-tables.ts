/* eslint-disable no-await-in-loop */
import { LoadBMSTable } from "bms-table-loader";
import TableValueGetters from "lookups";
import { BMS_TABLES } from "tachi-common";
import type { BMSTablesDataset } from "./types";
import type { BMSTableEntry } from "bms-table-loader";

// only 7k supported atm
const registeredTables: Array<BMSTablesDataset> = BMS_TABLES.filter((e) => e.playtype === "7K");

export interface TableRes {
	table: BMSTablesDataset;
	charts: Array<BMSTableEntry>;
}

export default async function GetTableData(): Promise<Array<TableRes>> {
	const out = [];

	for (const table of registeredTables.filter((e) => e.name in TableValueGetters)) {
		const bmsTable = await LoadBMSTable(table.url);

		out.push({ table, charts: bmsTable.body });
	}

	return out;
}
