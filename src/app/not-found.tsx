import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
      <GradientText as="h1" className="mb-4 text-7xl font-bold sm:text-9xl">
        404
      </GradientText>
      <p className="mb-2 text-xl font-semibold text-foreground">
        페이지를 찾을 수 없어요
      </p>
      <p className="mb-8 text-foreground-secondary">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있어요.
      </p>
      <Button href="/" size="lg">
        홈으로 돌아가기
      </Button>
    </div>
  );
}
