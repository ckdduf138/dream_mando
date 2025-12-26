// 네컷 basic 프레임의 배경/마스킹/오버레이를 분리해서 렌더링하는 컴포넌트
import React from 'react'
import { BASIC_FRAME_ASSETS } from '@utils/fourcut/basicFrameAssets'

export const BasicFrameDecoration: React.FC = () => (
  <>
    {/* 배경 */}
    <img
      src={BASIC_FRAME_ASSETS.background}
      alt="background"
      className="absolute inset-0 w-full h-full object-cover z-0"
      draggable={false}
    />
    {/* 마스킹 */}
    <img
      src={BASIC_FRAME_ASSETS.masking}
      alt="masking"
      className="absolute inset-0 w-full h-full object-cover z-20"
      draggable={false}
    />
    {/* 오버레이 */}
    <img
      src={BASIC_FRAME_ASSETS.overlay}
      alt="overlay"
      className="absolute inset-0 w-full h-full object-cover z-30 pointer-events-none"
      draggable={false}
    />
  </>
)
