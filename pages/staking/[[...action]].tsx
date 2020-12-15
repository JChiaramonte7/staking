import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Main from 'sections/staking';
import StatBox from 'components/StatBox';
import { LineSpacer, StatsSection } from 'styles/common';
import { formatFiatCurrency, formatPercent } from 'utils/formatters/number';
import useStakingCalculations from 'sections/staking/hooks/useStakingCalculations';
import useSelectedPriceCurrency from 'hooks/useSelectedPriceCurrency';

const StakingPage = () => {
	const { t } = useTranslation();
	const { stakedCollateralValue, percentageCurrentCRatio, debtBalance } = useStakingCalculations();
	const { selectedPriceCurrency, getPriceAtCurrentRate } = useSelectedPriceCurrency();

	return (
		<>
			<Head>
				<title>{t('staking.page-title')}</title>
			</Head>
			<StatsSection>
				<StakedValue
					title={t('common.stat-box.staked-value')}
					value={formatFiatCurrency(getPriceAtCurrentRate(stakedCollateralValue), {
						sign: selectedPriceCurrency.sign,
					})}
				/>
				<CRatio
					title={t('common.stat-box.c-ratio')}
					value={formatPercent(percentageCurrentCRatio)}
					size="lg"
				/>
				<ActiveDebt
					title={t('common.stat-box.active-debt')}
					value={formatFiatCurrency(getPriceAtCurrentRate(debtBalance), {
						sign: selectedPriceCurrency.sign,
					})}
				/>
			</StatsSection>
			<LineSpacer />
			<Main />
		</>
	);
};

const StakedValue = styled(StatBox)`
	.title {
		color: ${(props) => props.theme.colors.blue};
	}
`;
const CRatio = styled(StatBox)`
	.value {
		text-shadow: ${(props) => props.theme.colors.blueTextShadow};
		color: ${(props) => props.theme.colors.black};
	}
`;
const ActiveDebt = styled(StatBox)`
	.title {
		color: ${(props) => props.theme.colors.pink};
	}
`;

export default StakingPage;