import React from "react";
import NavBar from "../organisms/NavBar";
import "./StudyList.css"
import ChapterTitle from "../atoms/ChapterTitle";
function StudyList(){
    return(
        <div style={{width: '100%', height: '100%', paddingBottom: 80, background: '#FFF9F1', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
            <ChapterTitle />
    <div style={{flex: '1 1 0', alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 1440, height: 80, position: 'relative'}}>
            <div style={{width: 1440, height: 80, left: 0, top: 0, position: 'absolute', background: '#DCB78F'}} />
            <div style={{width: 40, height: 40, left: 137, top: 20, position: 'absolute', background: '#6B3906'}}></div>
            <img style={{width: 50, height: 40, left: 236, top: 20, position: 'absolute'}} src="https://via.placeholder.com/50x40" />
        </div>
        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <div style={{textAlign: 'center', color: '#412522', fontSize: 32, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>무엇을 학습할까??</div>
                <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                    <img style={{width: 171, height: 183, borderRadius: 2}} src="/image/squeez.png" />
                </div>
        </div>
        <div style={{width: 1194, justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{width: 1194, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 79, display: 'inline-flex'}}>
                <div style={{alignSelf: 'stretch', height: 283, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                    <div style={{width: 1194, height: 283, position: 'relative'}}>
                        <div style={{width: 276, height: 282, left: 306, top: 0, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                            <div style={{width: 276, height: 282, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                                <div style={{width: 276, height: 282, position: 'relative'}}>
                                    <div style={{width: 276, height: 282, left: 0, top: 0, position: 'absolute', background: '#DCB78F', borderRadius: 25}}></div>
                                    <div style={{width: 229, left: 23, top: 19, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>CH2. 한글자</div>
                                </div>
                                <div style={{width: 276, height: 226, position: 'relative'}}>
                                    <div style={{width: 276, height: 226, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%)', borderTopLeftRadius: 25, borderTopRightRadius: 25}} />
                                    <div style={{width: 130, height: 130, left: 73, top: 25, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                        <div style={{width: 130, height: 130, position: 'relative'}}>
                                            <div style={{width: 130, height: 130, left: 0, top: 0, position: 'absolute', background: '#BBBBBB', borderRadius: 9999}} />
                                            <div style={{width: 130, height: 130, left: 0, top: 0, position: 'absolute', background: '#4BB566', borderRadius: 9999}} />
                                            <div style={{left: 26, top: 54, position: 'absolute', textAlign: 'center', color: '#4BB566', fontSize: 32, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>100%</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: 257, height: 44, position: 'relative'}}>
                                    <div style={{width: 257, height: 44, left: 0, top: 0, position: 'absolute', background: '#6B3906', borderRadius: 10}} />
                                    <div style={{width: 125, height: 32, left: 57, top: 9, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                        <div style={{flex: '1 1 0', alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', gap: 13, display: 'inline-flex'}}>
                                            <div style={{width: 32, height: 32, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                                                <div style={{width: 14.67, height: 18.67, background: 'white'}}></div>
                                            </div>
                                            <div style={{textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>학습하기</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{width: 276, height: 282, left: 918, top: 0, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                            <div style={{width: 276, height: 282, position: 'relative'}}>
                                <div style={{width: 276, height: 282, left: 0, top: 0, position: 'absolute'}}>
                                    <div style={{width: 276, height: 282, left: 0, top: 0, position: 'absolute', background: '#DCB78F', borderRadius: 25}} />
                                    <div style={{width: 260, left: 8, top: 19, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>CH4.음운 변동</div>
                                </div>
                                <div style={{width: 276, height: 226, left: 0, top: 56, position: 'absolute'}}>
                                    <div style={{width: 276, height: 226, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderTopLeftRadius: 25, borderTopRightRadius: 25}} />
                                    <div style={{width: 130, height: 130, left: 75, top: 20, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                        <div style={{width: 130, height: 130, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                                            <div style={{width: 130, height: 130, background: '#BBBBBB', borderRadius: 9999}} />
                                            <div style={{width: 130, height: 130, background: '#D22D33', borderRadius: 9999}} />
                                            <div style={{textAlign: 'center', color: '#D22D33', fontSize: 32, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>10%</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: 257, height: 44, left: 11, top: 225, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                    <div style={{width: 257, height: 44, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                                        <div style={{width: 257, height: 44, background: '#6B3906', borderRadius: 10}} />
                                        <div style={{width: 32, height: 32, position: 'relative'}}>
                                            <div style={{width: 14.67, height: 18.67, left: 10.67, top: 6.85, position: 'absolute', background: 'white'}}></div>
                                        </div>
                                        <div style={{textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>학습하기</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{width: 276, height: 282.10, left: 0, top: 0, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                            <div style={{width: 276, height: 282.10, position: 'relative'}}>
                                <div style={{width: 276, height: 282, left: 0, top: 0, position: 'absolute'}}>
                                    <div style={{width: 276, height: 282, left: 0, top: 0, position: 'absolute', background: '#DCB78F', borderRadius: 25}} />
                                    <div style={{width: 214, height: 22, left: 31, top: 23.10, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>CH1. 자/모음</div>
                                </div>
                                <div style={{width: 276, height: 226, left: 0, top: 56.10, position: 'absolute'}}>
                                    <div style={{width: 276, height: 226, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderTopLeftRadius: 25, borderTopRightRadius: 25}} />
                                    <div style={{width: 130, height: 130, left: 73, top: 24.90, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                        <div style={{width: 130, height: 130, position: 'relative'}}>
                                            <div style={{width: 130, height: 130, left: 0, top: 0, position: 'absolute', background: '#BBBBBB', borderRadius: 9999}} />
                                            <div style={{width: 130, height: 130, left: 0, top: 0, position: 'absolute', background: '#48E370', borderRadius: 9999}} />
                                            <div style={{left: 26, top: 54, position: 'absolute', textAlign: 'center', color: '#48E370', fontSize: 32, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>100%</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: 257, height: 44, left: 9, top: 228.10, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                    <div style={{width: 257, height: 44, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                                        <div style={{width: 257, height: 44, background: '#6B3906', borderRadius: 10}} />
                                        <div style={{justifyContent: 'center', alignItems: 'center', gap: 13, display: 'inline-flex'}}>
                                            <div style={{width: 32, height: 32, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                                                <div style={{width: 14.67, height: 18.67, background: 'white'}}></div>
                                            </div>
                                            <div style={{textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>학습하기</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{width: 328, height: 283, left: 586, top: 0, position: 'absolute'}}>
                            <div style={{width: 328, height: 282, left: 0, top: 0, position: 'absolute'}}>
                                <div style={{width: 276, height: 282, left: 26, top: 0, position: 'absolute', background: '#DCB78F', borderRadius: 25}} />
                                <div style={{width: 328, height: 22, left: 0, top: 24, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>CH3. 받침 한글자</div>
                            </div>
                            <div style={{width: 276, height: 226, left: 26, top: 57, position: 'absolute'}}>
                                <div style={{width: 276, height: 226, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderTopLeftRadius: 25, borderTopRightRadius: 25}} />
                                <div style={{width: 130, height: 130, left: 73, top: 19, position: 'absolute'}}>
                                    <div style={{width: 130, height: 130, left: 0, top: 0, position: 'absolute', background: '#BBBBBB', borderRadius: 9999}} />
                                    <div style={{width: 130, height: 130, left: 0, top: 0, position: 'absolute', background: '#D22D33', borderRadius: 9999}} />
                                    <div style={{left: 32, top: 55, position: 'absolute', textAlign: 'center', color: '#D22D33', fontSize: 32, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>60%</div>
                                </div>
                            </div>
                            <div style={{width: 257, height: 44, left: 35, top: 229, position: 'absolute'}}>
                                <div style={{width: 257, height: 44, left: 0, top: 0, position: 'absolute', background: '#6B3906', borderRadius: 10}} />
                                <div style={{left: 57, top: 6, position: 'absolute', justifyContent: 'center', alignItems: 'center', gap: 13, display: 'inline-flex'}}>
                                    <div style={{width: 32, height: 32, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                                        <div style={{width: 14.67, height: 18.67, background: 'white'}}></div>
                                    </div>
                                    <div style={{textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>학습하기</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{height: 283, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                    <div style={{justifyContent: 'center', alignItems: 'center', gap: 30, display: 'inline-flex'}}>
                        <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <div style={{width: 276, height: 283, position: 'relative'}}>
                                <div style={{width: 276, height: 282, paddingLeft: 8, paddingRight: 8, paddingTop: 19, paddingBottom: 19, left: 0, top: 0, position: 'absolute', background: '#DCB78F', borderRadius: 25, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                                    <div style={{textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>CH5. 단어</div>
                                </div>
                                <div style={{width: 276, height: 226, left: 0, top: 57, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                                    <img style={{alignSelf: 'stretch', height: 226, borderTopLeftRadius: 25, borderTopRightRadius: 25}} src="https://via.placeholder.com/276x226" />
                                </div>
                                <div style={{width: 257, height: 44, paddingLeft: 60, paddingRight: 60, paddingTop: 6, paddingBottom: 6, left: 9, top: 228, position: 'absolute', background: '#6B3906', borderRadius: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                                    <div style={{height: 32, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                                        <div style={{position: 'relative'}}>
                                            <div style={{left: 45, top: 5, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>학습하기</div>
                                            <div style={{width: 32, height: 32, left: 0, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                                                <div style={{width: 14.67, height: 18.67, background: 'white'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <div style={{width: 276, height: 282, position: 'relative'}}>
                                <div style={{width: 276, height: 282, left: 0, top: 0, position: 'absolute'}}>
                                    <div style={{width: 276, height: 282, left: 0, top: 0, position: 'absolute', background: '#DCB78F', borderRadius: 25}} />
                                    <div style={{width: 260, left: 8, top: 19, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>CH6. 문장</div>
                                </div>
                                <div style={{width: 276, height: 226, left: 0, top: 56, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                    <img style={{width: 276, height: 226, borderTopLeftRadius: 25, borderTopRightRadius: 25}} src="https://via.placeholder.com/276x226" />
                                </div>
                                <div style={{width: 257, height: 44, left: 10, top: 225, position: 'absolute'}}>
                                    <div style={{width: 257, height: 44, left: 0, top: 0, position: 'absolute', background: '#6B3906', borderRadius: 10}} />
                                    <div style={{width: 125, height: 32, left: 56, top: 9, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                        <div style={{flex: '1 1 0', alignSelf: 'stretch', position: 'relative'}}>
                                            <div style={{left: 45, top: 5, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>학습하기</div>
                                            <div style={{width: 32, height: 32, left: 0, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                                                <div style={{width: 14.67, height: 18.67, background: 'white'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <div style={{width: 277, height: 282, position: 'relative'}}>
                                <div style={{width: 277, height: 282, left: 0, top: 0, position: 'absolute'}}>
                                    <div style={{width: 276, height: 282, left: 0, top: 0, position: 'absolute', background: '#DCB78F', borderRadius: 25}} />
                                    <div style={{width: 277, left: 0, top: 19, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>CH7. 헷갈리는 부분</div>
                                </div>
                                <div style={{width: 276, height: 226, left: 0, top: 56, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                    <img style={{width: 276, height: 226, borderTopLeftRadius: 25, borderTopRightRadius: 25}} src="https://via.placeholder.com/276x226" />
                                </div>
                                <div style={{width: 257, height: 44, left: 10, top: 229, position: 'absolute'}}>
                                    <div style={{width: 257, height: 44, left: 0, top: 0, position: 'absolute', background: '#6B3906', borderRadius: 10}} />
                                    <div style={{width: 125, height: 32, left: 59, top: 6, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                        <div style={{flex: '1 1 0', alignSelf: 'stretch', position: 'relative'}}>
                                            <div style={{left: 45, top: 5, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Jua', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>학습하기</div>
                                            <div style={{width: 32, height: 32, left: 0, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                                                <div style={{width: 14.67, height: 18.67, background: 'white'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
}
export default StudyList;