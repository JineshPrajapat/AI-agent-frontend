import { Box, Typography, Button, Fade } from '@mui/material';
import SearchBar from '../Component/SearchBar';
import Summary from '../Component/Summary';
import PaperTable from '../Component/PaperTable';
import { usePapers } from '../hooks/usePapers';
import { FileText } from 'lucide-react';
import { useState } from 'react';
import FeatureHighlights from '@/Component/FeatureHighlights';
import Modal from '@/Component/common/Modal';
import ChatInterface from '@/Component/chat/ChatInterface';

export default function ResearchSearchApp() {
    const {
        papers, loading, search, summary,
        searchPerformed, toggleSelection,
        toggleAllSelection, selectedCount, paperMetadata
    } = usePapers();

    const [query, setQuery] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);


    const handleChatOpen = () => {
        if (selectedCount > 0) {
            setIsChatOpen(true);
        } else {
            alert("Please select at least one paper to start a chat.");
        }
    };

    const closeChat = () => {
        setIsChatOpen(false);
    };

    return (
        <Box maxWidth="1400px" mx="auto" p={3}>
            <SearchBar
                value={query}
                onChange={setQuery}
                onSearch={() => query.trim() && search(query)}
                loading={loading}
            />

            {searchPerformed ? (
                <>
                    <Fade in timeout={800} mountOnEnter unmountOnExit>
                        <div>
                            <Summary sentences={summary} />
                        </div>
                    </Fade>

                    <Fade in timeout={1000} mountOnEnter unmountOnExit>
                        <div>
                            <Box>
                                <Typography variant="h6">Results ({papers?.length})</Typography>
                                {selectedCount > 0 && (
                                    <Box display="flex" justifyContent="flex-end">
                                        <Button
                                            startIcon={<FileText />}
                                            variant="contained"
                                            sx={{ my: 2 }}
                                            onClick={handleChatOpen}
                                        >
                                            Chat with Selected ({selectedCount})
                                        </Button>
                                    </Box>
                                )}
                                <PaperTable
                                    papers={papers}
                                    toggleAllSelection={toggleAllSelection}
                                    toggleSelection={toggleSelection}
                                />
                            </Box>
                        </div>
                    </Fade>
                </>
            ) : (
                <FeatureHighlights />
            )}

            <Modal isOpen={isChatOpen} onClose={closeChat}>
                <ChatInterface paperMetadata={paperMetadata} sessionId={Date.now()} />
            </Modal>

        </Box>
    );
}
