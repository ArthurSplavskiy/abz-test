'use client';

import { Button, Text } from '@/app/components/shared';
import { IUser } from '@/app/types';
import { Card } from './Card';
import { useEffect } from 'react';
import { useUserRefetch } from './refetchState';
import { useInfiniteQuery } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import classNames from 'classnames';
import styles from './index.module.scss';
import axios from 'axios';

async function fetchUsers(page = 0) {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/users?page=${page}&count=6`);
	return data.users;
}

export const GetSection = () => {
	const { refetchIsAvailable } = useUserRefetch((state) => state);
	const LIMIT = 6;

	const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, refetch } =
		useInfiniteQuery(['users', refetchIsAvailable], ({ pageParam = 1 }) => fetchUsers(pageParam), {
			getNextPageParam: (lastPage, allPages) => {
				const nextPage = lastPage.length === LIMIT ? allPages.length + 1 : undefined;
				return nextPage;
			}
		});

	useEffect(() => {
		if (refetchIsAvailable) {
			refetch();
		}
	}, [refetchIsAvailable, refetch]);

	return (
		<section id='get-section' className={classNames(styles.section, 'stack')}>
			<Text tag='h2' textAlign='center' marginBottom={50}>
				Working with GET request
			</Text>
			<div className={styles.list}>
				{isSuccess &&
					data?.pages.map((user) =>
						user.map((user: IUser) => (
							<Card
								key={user.id}
								name={user.name}
								image={user.photo}
								email={user.email}
								phone={user.phone}
								position={user.position}
							/>
						))
					)}
			</div>
			{(isFetchingNextPage || isLoading) && <CircularProgress style={{ marginTop: '20px' }} />}
			{hasNextPage && (
				<Button
					className={styles.btn}
					onClick={() => {
						fetchNextPage();
					}}>
					Show more
				</Button>
			)}
		</section>
	);
};
