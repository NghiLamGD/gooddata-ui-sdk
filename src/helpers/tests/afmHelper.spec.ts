// (C) 2007-2018 GoodData Corporation
import { AFM } from '@gooddata/typings';
import {
    getMasterMeasureObjQualifier,
    getMasterMeasureLocalIdentifier,
    findMeasureByLocalIdentifier
} from '../afmHelper';

describe('getMasterMeasureLocalIdentifier', () => {
    it('should return master local identifier of PP derived measure', () => {
        const measure: AFM.IMeasure = {
            localIdentifier: 'foo',
            definition: {
                previousPeriodMeasure: {
                    measureIdentifier: 'bar',
                    dateDataSets: [{
                        dataSet: { uri: '' },
                        periodsAgo: 1
                    }]
                }
            }
        };
        expect(getMasterMeasureLocalIdentifier(measure)).toBe('bar');
    });

    it('should return master local identifier of SP derived measure', () => {
        const measure: AFM.IMeasure = {
            localIdentifier: 'foo',
            definition: {
                popMeasure: {
                    measureIdentifier: 'bar',
                    popAttribute: { uri: '' }
                }
            }
        };
        expect(getMasterMeasureLocalIdentifier(measure)).toBe('bar');
    });
});

describe('findMeasureByIdentifier', () => {
    it('should find measure by its identifier in afm', () => {
        const measure: AFM.IMeasure = {
            localIdentifier: 'foo',
            definition: {
                measure: {
                    item: { uri: '' }
                }
            }
        };
        const afm: AFM.IAfm = {
            measures: [
                measure
            ]
        };
        expect(findMeasureByLocalIdentifier(afm, 'foo')).toEqual(measure);
    });
});

describe('getMeasureUriAndIdentifier', () => {
    describe('simple measure', () => {
        function buildAfm(simpleMeasureItem: AFM.ObjQualifier): AFM.IAfm {
            return {
                measures: [{
                    localIdentifier: 'm1',
                    definition: {
                        measure: {
                            item: simpleMeasureItem
                        }
                    }
                }]
            };
        }

        it('should return null when measure with the local identifier is not found', () => {
            const afm = buildAfm({
                uri: '/uri'
            });
            const result = getMasterMeasureObjQualifier(afm, 'm2');
            expect(result).toBeNull();
        });

        it('should return uri when measure with the local identifier has uri', () => {
            const afm = buildAfm({
                uri: '/uri'
            });
            const result = getMasterMeasureObjQualifier(afm, 'm1');
            expect(result).toEqual({
                uri: '/uri',
                identifier: undefined
            });
        });

        it('should return identifier when measure with the local identifier has identifier', () => {
            const afm = buildAfm({
                identifier: 'id'
            });
            const result = getMasterMeasureObjQualifier(afm, 'm1');
            expect(result).toEqual({
                uri: undefined,
                identifier: 'id'
            });
        });

        it('should return both uri and identifier when measure with the local identifier has both', () => {
            const afm = buildAfm({
                identifier: 'id',
                uri: '/uri'
            });
            const result = getMasterMeasureObjQualifier(afm, 'm1');
            expect(result).toEqual({
                uri: '/uri',
                identifier: 'id'
            });
        });
    });

    describe('PoP measure', () => {
        function buildAfm(simpleMeasureItem: AFM.ObjQualifier): AFM.IAfm {
            return {
                measures: [{
                    localIdentifier: 'm1',
                    definition: {
                        measure: {
                            item: simpleMeasureItem
                        }
                    }
                }, {
                    localIdentifier: 'm2',
                    definition: {
                        popMeasure: {
                            measureIdentifier: 'm1',
                            popAttribute: {
                                uri: '/date-attribute-uri'
                            }
                        }
                    }
                }]
            };
        }

        it('should return null when derived measure with the local identifier is not found', () => {
            const afm = buildAfm({
                uri: '/uri'
            });
            const result = getMasterMeasureObjQualifier(afm, 'm3');
            expect(result).toBeNull();
        });

        it('should return null when derived measure with a local identifier identifies unknown measure', () => {
            const afm = {
                measures: [{
                    localIdentifier: 'm1',
                    definition: {
                        measure: {
                            item: {
                                uri: '/uri'
                            }
                        }
                    }
                }, {
                    localIdentifier: 'm2',
                    definition: {
                        popMeasure: {
                            measureIdentifier: 'm3',
                            popAttribute: {
                                uri: '/pop-uri'
                            }
                        }
                    }
                }]
            };
            const result = getMasterMeasureObjQualifier(afm, 'm2');
            expect(result).toBeNull();
        });

        it('should return uri when master of derived measure with the local identifier has uri', () => {
            const afm = buildAfm({
                uri: '/uri'
            });
            const result = getMasterMeasureObjQualifier(afm, 'm2');
            expect(result).toEqual({
                uri: '/uri',
                identifier: undefined
            });
        });

        it('should return identifier when master of derived with the local identifier has identifier', () => {
            const afm = buildAfm({
                identifier: 'id'
            });
            const result = getMasterMeasureObjQualifier(afm, 'm2');
            expect(result).toEqual({
                uri: undefined,
                identifier: 'id'
            });
        });

        it('should return both uri and identifier when master of derived with the local identifier has both', () => {
            const afm = buildAfm({
                identifier: 'id',
                uri: '/uri'
            });
            const result = getMasterMeasureObjQualifier(afm, 'm2');
            expect(result).toEqual({
                uri: '/uri',
                identifier: 'id'
            });
        });
    });

    describe('previous period measure', () => {
        function buildAfm(simpleMeasureItem: AFM.ObjQualifier): AFM.IAfm {
            return {
                measures: [{
                    localIdentifier: 'm1',
                    definition: {
                        measure: {
                            item: simpleMeasureItem
                        }
                    }
                }, {
                    localIdentifier: 'm2',
                    definition: {
                        previousPeriodMeasure: {
                            measureIdentifier: 'm1',
                            dateDataSets: [{
                                dataSet: {
                                    uri: '/data-set-uri'
                                },
                                periodsAgo: 1
                            }]
                        }
                    }
                }]
            };
        }

        it('should return null when derived measure with the local identifier is not found', () => {
            const afm = buildAfm({
                uri: '/uri'
            });
            const result = getMasterMeasureObjQualifier(afm, 'm3');
            expect(result).toBeNull();
        });

        it('should return null when derived measure with a local identifier identifies unknown measure', () => {
            const afm = {
                measures: [{
                    localIdentifier: 'm1',
                    definition: {
                        measure: {
                            item: {
                                uri: '/uri'
                            }
                        }
                    }
                }, {
                    localIdentifier: 'm2',
                    definition: {
                        previousPeriodMeasure: {
                            measureIdentifier: 'm3',
                            dateDataSets: [{
                                dataSet: {
                                    uri: '/data-set-uri'
                                },
                                periodsAgo: 1
                            }]
                        }
                    }
                }]
            };
            const result = getMasterMeasureObjQualifier(afm, 'm2');
            expect(result).toBeNull();
        });

        it('should return uri when master of derived measure with the local identifier has uri', () => {
            const afm = buildAfm({
                uri: '/uri'
            });
            const result = getMasterMeasureObjQualifier(afm, 'm2');
            expect(result).toEqual({
                uri: '/uri',
                identifier: undefined
            });
        });

        it('should return identifier when master of derived with the local identifier has identifier', () => {
            const afm = buildAfm({
                identifier: 'id'
            });
            const result = getMasterMeasureObjQualifier(afm, 'm2');
            expect(result).toEqual({
                uri: undefined,
                identifier: 'id'
            });
        });

        it('should return both uri and identifier when master of derived with the local identifier has both', () => {
            const afm = buildAfm({
                identifier: 'id',
                uri: '/uri'
            });
            const result = getMasterMeasureObjQualifier(afm, 'm2');
            expect(result).toEqual({
                uri: '/uri',
                identifier: 'id'
            });
        });
    });
});
