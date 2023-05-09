import { GetSection, Hero, PostSection } from '@/app/components';
import { Wrapper } from './components/shared';

export default function Home() {
	return (
		<main>
			<Wrapper className='wrapper'>
				<Hero />
				<GetSection />
				<PostSection />
			</Wrapper>
		</main>
	);
}
