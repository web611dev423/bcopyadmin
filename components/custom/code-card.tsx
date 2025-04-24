import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Highlight, themes } from "prism-react-renderer";

const CodeCard = ({ code, language }: any) => {
  return (
    <Card className="bg-white border-[#c8c8c8]">
      <CardHeader className="p-0 border-b border-[#c8c8c8] flex justify-between items-center max-h-[5px]">
        <CardTitle className="text-md pl-4">{language.slice(0, 1).toUpperCase() + language.slice(1)}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[40vh] sm:h-[50vh] lg:h-[60vh] w-full text-sm overflow-x-auto">
          <Highlight theme={themes.oneLight} code={code} language={language == "java" ? "c" : language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`${className} whitespace-pre-wrap overflow-x-auto`} style={{ ...style, backgroundColor: 'transparent' }}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {/* <span className="text-gray-500 mr-4">{i + 1}</span> */}
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CodeCard;
