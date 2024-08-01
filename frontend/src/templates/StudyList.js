import React from "react";
import NavBar from "../organisms/NavBar";
import "./StudyList.css"
import ChapterMenu from "../atoms/ChapterMenu";
function StudyList(){
    return(
        <div>
            <NavBar />
            <div className="container">
                <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <div style={{justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                        <div style={{textAlign: 'center', color: '#412522', fontSize: 32, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>무엇을 학습할까??</div>
                    </div>
                    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <img style={{width: 171, height: 183, borderRadius: 2}} src="/image/squeez.png" />
                    </div>
                </div>
                <div style={{flex: '1 1 0', alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <div style={{width: 1194, justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{width: 1194, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 79, display: 'inline-flex'}}>
                            <div style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                                <div style={{width: 1194, height: 282, paddingLeft: 30, position: 'relative', flexDirection: 'row',justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                    <div style={{width: 276, height: 282, marginRight: 30,  position: 'relative', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                                        <ChapterMenu />
                                    </div>
                                    <div style={{width: 276, height: 282, marginRight: 30, position: 'relative', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                                        <ChapterMenu />
                                    </div>
                                    <div style={{width: 276, height: 282, marginRight: 30, position: 'relative', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                                        <ChapterMenu />
                                    </div>
                                    <div style={{width: 276, height: 282, marginRight: 30, position: 'relative'}}>
                                        <ChapterMenu />
                                    </div>
                                </div>
                            </div>
                            <div style={{height: 283, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                                <div style={{justifyContent: 'center', alignItems: 'center', gap: 30, display: 'inline-flex'}}>
                                    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                                        <div style={{width: 276, height: 283, position: 'relative'}}>
                                            <ChapterMenu />
                                        </div>
                                    </div>
                                    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                                        <div style={{width: 276, height: 282, position: 'relative'}}>
                                            <ChapterMenu />
                                        </div>
                                    </div>
                                    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                                        <div style={{width: 277, height: 282, position: 'relative'}}>
                                            <ChapterMenu />
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