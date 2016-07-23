angular.module('overwatch-hero-picker').service('HeroPickerService', function ($q, HeroesService) {

    this.getRecommendedHero = (opposingHeroes) => $q.all({
        heroes: HeroesService.getHeroes(),
        matching: HeroesService.getMatching()
    }).then((result) => {
        let recommendedCounterByHero = {};
        let recommendedByMap = {};


        //(Hero1+Hero2+Hero3+Hero4+Hero5+Hero6+(MapRating x oppossingHeroeCount)) x PlayerRating
        for (let pickHeroId in result.matching) {
            if (result.matching.hasOwnProperty(pickHeroId)) {
                recommendedCounterByHero[pickHeroId] = 0;

                for (let opposingHeroId in opposingHeroes) {
                    if (opposingHeroes.hasOwnProperty(opposingHeroId)) {
                        recommendedCounterByHero[pickHeroId] += result.matching[pickHeroId].heroes[opposingHeroId] || 0;
                    }
                }
            }
        }

        return recommendedCounterByHero;

    });
});
