'use client';
import { createConStore, } from '../../../src';

const useTopicView = createConStore(
	{
		topicHrefs: [] as string[],
		firstTopicHref: '',
	},
	{
		acts( { setWrap, }, ) {
			let topicObserver: IntersectionObserver | null = null;

			const topicHrefMap = new Map<string, number | undefined>();
			const addTopic = setWrap( ( { draft, }, topicEntry: IntersectionObserverEntry, ) => {
				const target = topicEntry.target as HTMLDivElement;
				const topicHref = target.dataset.href as string;
				const topicHrefs = draft.topicHrefs;
				topicHrefs.push( topicHref, );
				topicHrefMap.set( topicHref, target?.parentElement?.offsetTop, );

				topicHrefs.sort( ( a, b, ) => {
					const aTop = topicHrefMap.get( a, );
					const bTop = topicHrefMap.get( b, );
					if ( aTop == null ) {
						return 1;
					}
					if ( bTop == null ) {
						return -1;
					}
					return aTop - bTop;
				}, );

				draft.firstTopicHref = topicHrefs[ 0 ];
			}, );
			const removeTopic = setWrap( ( { draft, }, topicEntry: IntersectionObserverEntry, ) => {
				const target = topicEntry.target as HTMLDivElement;
				const topicHref = target.dataset.href as string;
				const topicHrefs = draft.topicHrefs.filter( href => href !== topicHref, );
				topicHrefMap.delete( topicHref, );
				draft.topicHrefs = topicHrefs;
			}, );

			return {
				addTopic,
				removeTopic,
				topicObserver() {
					if ( topicObserver ) {
						return topicObserver;
					}
					if ( typeof window !== 'undefined' ) {
						topicObserver = new IntersectionObserver(
							( entries, ) => {
								entries.forEach( ( entry, ) => {
									if ( entry.isIntersecting ) {
										addTopic( entry, );
									}
									else {
										removeTopic( entry, );
									}
								}, );
							},
							{
								threshold: 0.1,
							},
						);
					}

					return topicObserver;
				},
			};
		},
	},
);

export default useTopicView;
