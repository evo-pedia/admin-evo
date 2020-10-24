/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, CircularProgress, CssBaseline, makeStyles, TableCell } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

import AppBar from './AppBar';
import DateHeader from './DateHeader';
import MemberSearch from './MemberSearch';
import DataTable from 'mui-datatables';
import { dateFormat } from '../utils';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: {
    paddingRight: 24,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  loading: {
    display: 'block',
    margin: '25% auto',
  },
}));


export default function VideoComponent() {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);

	  // search states
		const [searchUname, setSearchUname] = useState('');
		const [searchLoading, setSearchLoading] = useState(false);


		// TABLES
		const [dataTable, setDataTable] = useState([
[			'1',
			'20,june',
			'username',
			'video1'],
[			'2',
'20,September',
			'username2',
			'video2'],
[			'3',
'21,june',
			'username3',
			'video1']
		]);

		const options = {
			elevation: 4,
			print: false,
			selectableRows: 'none',
			search: false,
			responsive: 'standard',
			// downloadOptions: {
			// 	filename: `List Member per ${dateFormat()}.csv`,
			// },
		};

		const columns = [
			{
				name: 'ID',
				options: {
					filter: true,
					display: 'none',
				},
			},
			'Date',
			'Username',
			'Videos',
			// 'Email',
			// 'Role',
			// 'Type',
			// 'NIK',
			// 'Referred By',
			// 'Status Activation',
			// 'Deposit Activation',
			// 'Peds',
			// 'Voucher',
			{
				name: 'Menu',
				options: {
					filter: false,
					download: false,
					print: false,
					customBodyRender: (val, meta, upd) => (
						<TableCell align="right" >
							{/* <Box m={2}> */}
								<Button
									variant="contained"
									color="primary"								
									// onClick={() => handleFormOpen(meta)}
									>
									Info
								</Button>
							{/* </Box> */}
						</TableCell>
					),
				},
			},
		];

		useEffect(() => {

			console.log(dataTable)
		}, [])

	return(
		<div className={classes.root}>
			<CssBaseline />
			<AppBar />
			<main className={classes.content}>
				<DateHeader />
				{ loading ? 
					<CircularProgress size={100} className={classes.loading} /> :
					(
						<>
							{searchLoading ?
								<CircularProgress size={25} classNames={classes.loading} /> :
								<Box ml="45vw">
									<MemberSearch searchedUsername={(uname) => setSearchUname(uname)} />
								</Box>
							}
							<Box mt={3} mb={9}>
                <DataTable
                  title={'Video Member'}
                  data={dataTable}
                  columns={columns}
									options={options}
                />
              </Box>
						</>
					)
				}
			</main>
		</div>
	);
}