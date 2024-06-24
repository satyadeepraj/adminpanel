
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export function table() {
  return (
    (<div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-blue-500 text-white">
          <TableRow>
            <TableHead className="px-4 py-3">Target URL</TableHead>
            <TableHead className="px-4 py-3">Vulnerability</TableHead>
            <TableHead className="px-4 py-3">Severity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="px-4 py-3">https://example.com/login</TableCell>
            <TableCell className="px-4 py-3">Cross-Site Scripting (XSS)</TableCell>
            <TableCell className="px-4 py-3 font-medium text-red-500">High</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3">https://example.com/admin</TableCell>
            <TableCell className="px-4 py-3">SQL Injection</TableCell>
            <TableCell className="px-4 py-3 font-medium text-orange-500">Medium</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3">https://example.com/contact</TableCell>
            <TableCell className="px-4 py-3">Insecure Direct Object Reference</TableCell>
            <TableCell className="px-4 py-3 font-medium text-green-500">Low</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>)
  );
}
