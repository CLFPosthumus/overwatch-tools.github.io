angular.module('overwatch-hero-picker').service('HeroPickerService', function ($q, HeroesService) {

    this.getRecommendedHero = (opposingHeroes, map, heroesRating) => $q.all({
        heroes: HeroesService.getHeroes(),
        matching: HeroesService.getMatching()
    }).then((result) => {
        let recommendedCounterByHero = {};
        let recommendedByMap = {};
        let finalRating = {};
        let nbOpponent = Object.keys(opposingHeroes).length;

        //(Hero1+Hero2+Hero3+Hero4+Hero5+Hero6+(MapRating x opposingHeroesCount *.4)) x PlayerRating
        for (let pickHeroId in result.matching) {
            if (result.matching.hasOwnProperty(pickHeroId)) {
                recommendedCounterByHero[pickHeroId] = 0;

                for (let opposingHeroId in opposingHeroes) {
                    if (opposingHeroes.hasOwnProperty(opposingHeroId)) {
                        recommendedCounterByHero[pickHeroId] += result.matching[pickHeroId].heroes[opposingHeroId] || 0;
                    }
                }

                if (map) {
                    recommendedByMap[pickHeroId] = result.matching[pickHeroId].maps[map.id] || 0;
                } else {
                    recommendedByMap[pickHeroId] = 0;
                }
                finalRating[pickHeroId] =
                    recommendedByMap[pickHeroId] * 0.4 +
                    heroesRating[pickHeroId] * 0.6;

                if (nbOpponent !== 0){
                    finalRating[pickHeroId] += recommendedCounterByHero[pickHeroId] / nbOpponent * -1;
                }
            }
        }



        return {
            heroCounterRating: recommendedCounterByHero,
            heroMapRating: recommendedByMap,
            finalRating: finalRating
        };

    });
});
